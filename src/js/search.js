function searchUsers(json){

  // console.log(json)
  
  const form = document.getElementById("form")
  const tableBody = document.getElementById("table-body")
  const btnSearch = document.getElementById("button-addon2")
  const inputSearch = form.inputSearch
  const tableChilds = document.getElementsByTagName('tr')


  function deleteUser(){
    for(let i = 1; i < tableChilds.length; i++){
      // tableBody.removeChild(tableChilds[i])
      tableChilds[i].style.display = "none"
    }
  }



  function filterUsers(userSearch){

    const result = json.filter(u => u.givenName === userSearch ? u : false)
    // console.log("users found:", result)

    //search by Name:
    if(result.length != 0){
      deleteUser()
      dataTable(result)

    //if search by Name = 0 then search by lastName or userName:
    }else{
      const result = []
      for (let i = 0; i < json.length; i++) {
        if(userSearch === json[i].surname || userSearch === json[i].displayName){
          result.push(json[i])
        }
      }

      // json.forEach(el =>{
      //   console.log(el)
      //   const users = Object.keys(el)
      //   if(userSearch === el[users].lastName || userSearch === el[users].userName){
      //     result.push(el)
      //   }
      // })

      if(result.length != 0){
        // console.log(result)
        deleteUser()
        dataTable(result)
      }else{
        alert(`User not found`)
      }
    }
  }


let typingtimer = null;
inputSearch.addEventListener('keyup', e =>{

  if(e.key === 'Escape') e.target.value = ''
  if(e.key === "Enter") filterUsers(e.target.value)

  if(e.target.value === ""){
    deleteUser()
    dataTable(json)
  }else{
    //timer to search:
    clearTimeout(typingtimer)
    typingtimer = setTimeout(() => {
      filterUsers(e.target.value)
      clearTimeout(typingtimer)
    }, 1500);
  }
})

btnSearch.addEventListener('click', e =>{
  filterUsers(inputSearch.value)
})

}
