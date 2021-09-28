  // const params = window.location.search;
  // const urlParams = new URLSearchParams(params)
  // const userParam = urlParams.get('user')

async function openDetails(user){
  console.log(user)

  if(user){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }
  
  const rolsResponse = await fetch('./locales/rols.json')
  const rolsJson = await rolsResponse.json()

  // const airportsResponse = await fetch('https://acsstandardapi.azurewebsites.net/Api/GetAirports')
  // const airportsJson = await airportsResponse.json()
  // console.log(airportsResponse)
  // console.log(airportsJson)
  
  const userName = document.getElementById('user-name')
  const userDetails = document.getElementById('user-details')
  const activeRols = document.getElementById('active-rols')
  const aviableRols = document.getElementById('aviable-rols')

  userName.innerHTML = user.displayName

  for (const key in user) {
    // console.log(key, user[key])
    const liUserDetails = `
      <li>
        <div class="">
          <h5>${key}: ${user[key]}</h5>
        </div>
      </li>`

    userDetails.innerHTML += liUserDetails
  }

  try{
    
    rolsJson.forEach(rol => {
      for (let i = 0; i < rol.activeRols.length; i++) {
        const liActiveRols = `
          <li>
            <div class="container-rols my-2 d-flex justify-content-between">
              <h5 class="m-0">${rol.activeRols[i]}</h5>
              <button id="${rol.activeRols[i]}" class="btn p-0"><img src="./img/remove.png" alt="garbage" width="20"></button>
            </div>
          </li>`
        activeRols.innerHTML += liActiveRols
      }

      for (let i = 0; i < rol.aviableRols.length; i++) {
        const liAviableRols = `
          <li>
            <div class="container-rols my-2 d-flex justify-content-between">
              <h5 class="m-0">${rol.aviableRols[i]}</h5>
              <button id="${rol.aviableRols[i]}" class="btn p-0"><img src="./img/add.svg" alt="garbage" width="20"></button>
            </div>
          </li>`
        aviableRols.innerHTML += liAviableRols
      }
    })


  }catch{}

  const tableBody = document.getElementById('table-body-details')
  const tableHead = document.getElementById('table-head-details')


  // for (let i = 0; i < user.length; i++) {}
  //   if(userParam === user[i].givenName){}


  const thead = `
    <th class=" px-3">Admin</th>
    <th class=" px-3">Guest</th>
    <th class=" px-3">Owner</th>
    <th class=" px-3">Action</th>`

  //dev row
  const tbody = `
    <td class="py-3"><input name="admin" type="checkbox"></input></td>
    <td class="py-3"><input name="guest" type="checkbox"></input></td>
    <td class="py-3"><input name="owner" type="checkbox"></input></td>

    <td style="width:30%;">
    <button type="button" class="mt-1 btn btn-details">Add</button>
    <button type="button" class="mt-1 btn btn-details">Save</button>
      <button type="button" class="mt-1 btn btn-details">Remove</button>
    </td>`

  // tableHead.innerHTML = thead
  // tableBody.innerHTML = tbody

  document.addEventListener('click', e =>{
    const btn = e.target
    // console.log(btn)
    if(btn.id === "close-window")window.close()
    if(btn.id === "reset") window.location.reload()
  })

  // user.forEach(el =>{
  //   const users = Object.keys(el)

  //   if(userParam === el[users].userName){
  //     // console.log(el)
  //     const row = `
  //         <td class="py-3">${users}</td>
  //         <td class="py-3">${el[users].lastName}</td>
  //         <td class="py-3">${el[users].userName}</td>
  //         <td class="py-3"><input name="admin" type="checkbox"></input></td>
  //         <td class="py-3"><input name="guest" type="checkbox"></input></td>
  //         <td class="py-3"><input name="owner" type="checkbox"></input></td>
  //         <td class=""><button type="button" class="btn btn-details">Remove</button></td>`

  //     tableDetails.innerHTML = row
  //   }
  // })

}
