function openDetails(user){
  console.log(user)

  // const params = window.location.search;
  // const urlParams = new URLSearchParams(params)
  // const userParam = urlParams.get('user')
  const tableBody = document.getElementById('table-body-details')
  const tableHead = document.getElementById('table-head-details')
  const userDetails = document.getElementById('user-details')

  if(user){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }

  // for (let i = 0; i < user.length; i++) {}
  //   if(userParam === user[i].givenName){}

  const userName = document.getElementById('user-name')
  userName.innerHTML = user.displayName

  const li = `
    <li><div class=""><h5>ID: ${user.id}</h5></div></li>
    <li><div class=""><h5>Email: ${user.mail}</h5</div></li>
    <li><div class=""><h5>Job Title: ${user.jobTitle}</h5></div></li>
    <li><div class=""><h5>Mobile phone number: ${user.mobilePhone}</h5></div></li>
    <li><div class=""><h5>Oficce location: ${user.officeLocation}</h5></div></li>`

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

  userDetails.innerHTML = li
  // tableHead.innerHTML = thead
  // tableBody.innerHTML = tbody


  const closeWindow = document.getElementById('close-window')
  closeWindow.addEventListener('click', e =>{
    window.close()
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
