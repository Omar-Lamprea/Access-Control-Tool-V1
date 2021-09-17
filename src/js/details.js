function openDetails(user){

  if(user){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }

  const params = window.location.search;
  const urlParams = new URLSearchParams(params)
  const userParam = urlParams.get('user')
  const tableDetails = document.getElementById('table-body-details')

  
  for (let i = 0; i < user.length; i++) {
    if(userParam === user[i].givenName){
      const row = `
      <td class="py-3">${user[i].givenName}</td>
      <td class="py-3">${user[i].surname}</td>
      <td class="py-3">${user[i].displayName}</td>
      <td class="py-3"><input name="admin" type="checkbox"></input></td>
      <td class="py-3"><input name="guest" type="checkbox"></input></td>
      <td class="py-3"><input name="owner" type="checkbox"></input></td>
      <td class=""><button type="button" class="btn btn-details">Remove</button></td>`

  tableDetails.innerHTML = row
    }
  }

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
