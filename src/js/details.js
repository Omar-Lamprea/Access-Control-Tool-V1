async function openDetails(){
  const urlParams = new URLSearchParams(window.location.search)
  const getUserParam = urlParams.get('user')
  // console.log(getUserParam);

  const userName = document.getElementById('user-name')
  const userDetails = document.getElementById('user-details')
  const activeRols = document.getElementById('active-rols')
  const aviableRols = document.getElementById('aviable-rols')
  let activeRoles = []
  let aviableRoles = []

  const searchUser = await fetch(`${urlApi}/?search="mail:${getUserParam}"`)
  const userFound = await searchUser.json()
  const user = userFound[0]
  // console.log(user[0]);


  if(searchUser.status === 200){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
    getRoles()
  }

  userName.innerHTML = user.displayName

  

  for (const key in user) {
    const liUserDetails = `
      <li>
        <div class="">
          <p class="fs-5 m-0">${key} : ${user[key]}</p>
        </div>
      </li>`
    if(key === "userPrincipalName" || key === "odataId" || user[key] === null){
      continue
    }
    userDetails.innerHTML += liUserDetails
  }

  async function getRoles(){
    activeRoles = []
    aviableRoles = []
    const getUserDetails = await fetch(`${urlApi}/${user.id}`)
    const responseUser = await getUserDetails.json()
   
    // const userData = responseUser.userGraph
    const userRoles = responseUser.query
    validateRoles(userRoles)
  }

  

  function validateRoles(userRoles){
    console.log(userRoles);

    userRoles.forEach(role => {
      if (role.isActive) {
        activeRoles.push(role)
      }else {
        aviableRoles.push(role)
      }
    });

    console.log('active:', activeRoles);
    console.log('aviable:', aviableRoles);

    activeRoles.forEach(role => {
      const liActiveRole = `
        <li>
          <div class="d-flex mb-2 justify-content-between align-items-center">
            <p class="fs-5 m-0">${role.roleName}</p>
            <button data-id="${role.roleId}" data-rol="${role.roleName}" class="btn p-0 rol-active remove-role"></button>
          </div>
        </li>`
      activeRols.innerHTML += liActiveRole
    });
  
    aviableRoles.forEach(role => {
      const liAviableRole = `
        <li>
          <div class="d-flex mb-2 justify-content-between align-items-center">
            <p class="fs-5 m-0">${role.roleName}</p>
            <button data-id="${role.roleId}" data-rol="${role.roleName}" class="btn p-0 rol-aviable add-role"></button>
          </div>
        </li>`
        aviableRols.innerHTML += liAviableRole
    });
  }



  async function desactivateRole(roleId, userId){
    console.log('des', roleId, 'userId:', userId);
    const desactivate = await fetch(`${urlApi}/UpdateUserRole/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "roleId": roleId,
        "action": "delete"
      })
    })
    const content = await desactivate.json()
    if (content.message === 'role updated successfully') {
      clearRoles()
      getRoles()
    }
  }

  async function activateRole(roleId, userId){
    console.log('act', roleId, 'userId:',userId);
    const activate = await fetch(`${urlApi}/UpdateUserRole/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        "roleId": roleId,
        "action": "insert"
      })
    })
    const content = await activate.json()
    if (content.message === 'role updated successfully') {
      clearRoles()
      getRoles()
    }
  }


  function clearRoles(){
  
    while(aviableRols.firstChild){
      aviableRols.removeChild(aviableRols.firstChild)
    }
  
    while(activeRols.firstChild){
      activeRols.removeChild(activeRols.firstChild)
    }
  }

  document.addEventListener('click', e =>{
  
    const btn = e.target
    if(btn.id === "close-window")window.close()

    if(btn.className.includes('rol-aviable')){
      // console.log("aviable:", btn, btn.dataset.id, btn.dataset.rol)
      activateRole(btn.dataset.id, user.id)
    }
  
    if(btn.className.includes('rol-active')){
      // console.log("Active: ",btn, btn.dataset.id, btn.dataset.rol)
      desactivateRole(btn.dataset.id, user.id)
    }
  })
  

  // readRoles()
  // async function readRoles(){
  //   clearRoles()
  //   const rolActive = await fetch('http://localhost:5000/activeRoles')
  //   const rolActiveJson = await rolActive.json()

  //   const rolAviable = await fetch('http://localhost:5000/aviableRoles')
  //   const rolAviableJson = await rolAviable.json()

  //   try{
  //     rolAviableJson.forEach(rolAviable => {
  //       // console.log(rolAviable)
  //       const li = `
  //       <li>
  //         <div class="container-rols my-2 d-flex justify-content-between">
  //           <h5 class="m-0">${rolAviable.role}</h5>
  //           <button data-id="${rolAviable.id}" data-rol="${rolAviable.role}" class="btn p-0 rol-aviable add-role"></button>
  //         </div>
  //       </li>`
  //       aviableRols.innerHTML += li
  //     });
  
  //     rolActiveJson.forEach(rolActive => {
  //       // console.log(rolActive)
  //       const li = `
  //       <li>
  //         <div class="container-rols my-2 d-flex justify-content-between">
  //           <h5 class="m-0">${rolActive.role}</h5>
  //           <button data-id="${rolActive.id}" data-rol="${rolActive.role}" class="btn p-0 rol-active remove-role"></button>
  //         </div>
  //       </li>`
  //       activeRols.innerHTML += li
  //     });
  
  //   }catch(err){
  //     console.log("error:", err)
  //   }
  // }
  
  // async function updateAviableRoles (rolId, roleName){
  //   const createRol = await fetch('http://localhost:5000/activeRoles',{
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json; charset=utf-8"
  //     },
  //     body: JSON.stringify({
  //       role: roleName
  //     })
  //   })
  //   const deleteRole = await fetch(`http://localhost:5000/aviableRoles/${rolId}`, {
  //     method : 'DELETE'
  //   })
  //   readRoles()
  // }
  
  // async function updateActiveRoles (rolId, roleName){
  //   const createRol = await fetch('http://localhost:5000/aviableRoles',{
  //     method: 'POST',
  //     headers: {
  //       "Content-type": "application/json; charset=utf-8"
  //     },
  //     body: JSON.stringify({
  //       role: roleName
  //     })
  //   })
  //   const deleteRole = await fetch(`http://localhost:5000/activeRoles/${rolId}`, {
  //     method : 'DELETE'
  //   })
  //   readRoles()
  // }
  
  

  //request airports:
  const airportsResponse = await fetch('https://acsstandardapi.azurewebsites.net/api/Airportdetails')
  const airportsJson = await airportsResponse.json()
  // console.log(airportsJson)
  const airports = airportsJson.Data
  const airport = airportsJson.Data[0]
  // console.log(airport)

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