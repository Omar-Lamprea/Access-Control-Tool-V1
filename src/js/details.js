function openDetails(user){

  const params = window.location.search;
  const urlParams = new URLSearchParams(params)
  const userParam = urlParams.get('user')
  const tableBody = document.getElementById('table-body-details')
  const tableHead = document.getElementById('table-head-details')

  if(user){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }

  for (let i = 0; i < user.length; i++) {
    if(userParam === user[i].givenName){

      const userName = document.getElementById('user-name')
      userName.innerHTML = user[i].displayName

      const thead = `              
        <th class=" px-3">Email</th>
        <th class=" px-3">Admin</th>
        <th class=" px-3">Guest</th>
        <th class=" px-3">Owner</th>
        <th class=" px-3">Airports</th>
        <th class=" px-3">Action</th>`

      // main row
      // const row = `
      // <td class="py-3">${user[i].givenName}</td>
      // <td class="py-3">${user[i].surname}</td>
      // <td class="py-3">${user[i].displayName}</td>
      // <td class="py-3"><input name="admin" type="checkbox"></input></td>
      // <td class="py-3"><input name="guest" type="checkbox"></input></td>
      // <td class="py-3"><input name="owner" type="checkbox"></input></td>
      // <td class=""><button type="button" class="btn btn-details">Remove</button></td>`

      //dev row
      const tbody = `
        <td class="py-3">${user[i].mail}</td>
        <td class="py-3"><input name="admin" type="checkbox"></input></td>
        <td class="py-3"><input name="guest" type="checkbox"></input></td>
        <td class="py-3"><input name="owner" type="checkbox"></input></td>
        <td class="py-3">
          <select name="airports">
            <option value="value1">Value 1</option>
            <option value="value2">Value 2</option>
            <option value="value3">Value 3</option>
          </select>
        </td>
        <td class="w-25">
          <button type="button" class="mt-1 btn btn-details">Save</button>
          <button type="button" class="mt-1 btn btn-details">Remove</button>
        </td>`

      tableHead.innerHTML = thead
      tableBody.innerHTML = tbody
    }
  }

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
