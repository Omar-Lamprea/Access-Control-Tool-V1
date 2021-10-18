
async function openDetails(user){

  const userName = document.getElementById('user-name')
  const userDetails = document.getElementById('user-details')
  const activeRols = document.getElementById('active-rols')
  const aviableRols = document.getElementById('aviable-rols')

  console.log(user)

  if(user){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }



  userName.innerHTML = user.displayName

  for (const key in user) {
    // console.log(key, user[key])
    const liUserDetails = `
      <li>
        <div class="">
          <p class="fs-5 m-0">${key} : ${user[key]}</p>
        </div>
      </li>`
    if(key === "userPrincipalName" || key === "odataId" || user[key] === null){
      continue
    }
    // console.log(user)
    userDetails.innerHTML += liUserDetails
  }

  readRoles()

  document.addEventListener('click', e =>{
  
    const btn = e.target
    if(btn.id === "close-window")window.close()
    if(btn.id === "reset") window.location.reload()
  
    if(btn.className.includes('rol-aviable')){
      // console.log("aviable:", btn, btn.dataset.id, btn.dataset.rol)
      updateAviableRoles(btn.dataset.id, btn.dataset.rol)
    }
  
    if(btn.className.includes('rol-active')){
      // console.log("Active: ",btn, btn.dataset.id, btn.dataset.rol)
      updateActiveRoles(btn.dataset.id, btn.dataset.rol)
    }

  })
  
  async function readRoles(){
    clearRoles()
    const rolActive = await fetch('http://localhost:5000/activeRoles')
    const rolActiveJson = await rolActive.json()

    const rolAviable = await fetch('http://localhost:5000/aviableRoles')
    const rolAviableJson = await rolAviable.json()

    try{
      rolAviableJson.forEach(rolAviable => {
        // console.log(rolAviable)
        const li = `
        <li>
          <div class="container-rols my-2 d-flex justify-content-between">
            <h5 class="m-0">${rolAviable.role}</h5>
            <button data-id="${rolAviable.id}" data-rol="${rolAviable.role}" class="btn p-0 rol-aviable add-role"></button>
          </div>
        </li>`
        aviableRols.innerHTML += li
      });
  
      rolActiveJson.forEach(rolActive => {
        // console.log(rolActive)
        const li = `
        <li>
          <div class="container-rols my-2 d-flex justify-content-between">
            <h5 class="m-0">${rolActive.role}</h5>
            <button data-id="${rolActive.id}" data-rol="${rolActive.role}" class="btn p-0 rol-active remove-role"></button>
          </div>
        </li>`
        activeRols.innerHTML += li
      });
  
    }catch(err){
      console.log("error:", err)
    }
  }
  
  async function updateAviableRoles (rolId, roleName){
    const createRol = await fetch('http://localhost:5000/activeRoles',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        role: roleName
      })
    })
    const deleteRole = await fetch(`http://localhost:5000/aviableRoles/${rolId}`, {
      method : 'DELETE'
    })
    readRoles()
  }
  
  async function updateActiveRoles (rolId, roleName){
    const createRol = await fetch('http://localhost:5000/aviableRoles',{
      method: 'POST',
      headers: {
        "Content-type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        role: roleName
      })
    })
    const deleteRole = await fetch(`http://localhost:5000/activeRoles/${rolId}`, {
      method : 'DELETE'
    })
    readRoles()
  }
  
  function clearRoles(){
  
    while(aviableRols.firstChild){
      aviableRols.removeChild(aviableRols.firstChild)
    }
  
    while(activeRols.firstChild){
      activeRols.removeChild(activeRols.firstChild)
    }
  }

  //request airports:
  const airportsResponse = await fetch('https://acsstandardapi.azurewebsites.net/api/Airportdetails')
  // console.log(airportsResponse)
  const airportsJson = await airportsResponse.json()
  const airports = airportsJson.Data
  const airport = airportsJson.Data[0]
  console.log(airport)

  const headTableAirport = document.getElementById('head-airports-table')
  const rowAirport = document.getElementById('body-airports-table')

  //table header
  for (const key in airport) {
    const headTable = `<th>${key}</th>`
    headTableAirport.innerHTML += headTable
  }

  //table body
  
  airports.forEach(airportData => {
    const row = `
      <tr>
        <td>${airportData.Code}</td>
        <td>${airportData.City}</td>
        <td>${airportData.MsftTimeZone}</td>
        <td>${airportData.IanaTimeZone}</td>
        <td>${airportData.CountryISO}</td>
        <td>${airportData.Country}</td>
      </tr>`

    rowAirport.innerHTML += row
  });
}