function dataTable(json){

  if(json){
    const loaderTable = document.getElementById('loader-table')
    loaderTable.classList.add('d-none')
  }

  const state = {
    'querySet': json,
    
    'page': 1, // init page
    'rows': 5, // rows number
    'window': 5, // pagination number
  }
  
  buildTable()
  
  function pagination(querySet, page, rows) {
    const trimStart = (page - 1) * rows
    const trimEnd = trimStart + rows
    const trimmedData = querySet.slice(trimStart, trimEnd)
    const pages = Math.round(querySet.length / rows);

    return {
      'querySet': trimmedData,
      'pages': pages,
    }
  }
  
  function pageButtons(pages) {
    const wrapper = document.getElementById('pagination-wrapper')
    // const wrapperBtns = document.getElementsByClassName('page btn btn-sm btn-info')
  
    wrapper.innerHTML = ``
    // console.log('Pages:', pages, "Init:", state.page)
    let maxLeft = (state.page - Math.floor(state.window / 2))
    let maxRight = (state.page + Math.floor(state.window / 2))
  
    if (maxLeft < 1) {
        maxLeft = 1
        maxRight = state.window
    }
  
    if (maxRight > pages) {
        maxLeft = pages - (state.window - 1)
        
        if (maxLeft < 1){
            maxLeft = 1
        }
        maxRight = pages
    }
  
  
    //add numbers
    for (let page = maxLeft; page <= maxRight; page++) {
        wrapper.innerHTML += `<button id="${page}" value=${page} class="page btn btn-sm btn-info">${page}</button>`
    }

    //add class active number
    for(let i = 1; i <= state.page; i++){
      const activeNumber = document.getElementById(i);
      if(i === state.page) !!activeNumber ? activeNumber.classList.add("active") : false
    }
    
    //add prev button
    if (state.page != 1) {
        wrapper.innerHTML = `<button value=${1} class="page btn btn-sm btn-info">&#171;</button>` + wrapper.innerHTML
    }
  
    //add next button
    if (state.page != pages) {
        wrapper.innerHTML += `<button value=${pages} class="page btn btn-sm btn-info">&#187;</button>`
    }

    $('.page').on('click', function() {
      $('#table-body').empty()
      state.page = Number($(this).val())
      buildTable()
    })
  }
  
  function buildTable() {
    const table = $('#table-body')
    const data = pagination(state.querySet, state.page, state.rows)
    const userList = data.querySet
    
    for (let i = 0; i < userList.length; i++) {
      // console.log(userList[i].givenName)
      // console.log(userList[i].surname)
      // console.log(userList[i].displayName)

      const row = `
        <tr class="row-table">
          <td class=" p-3">${userList[i].givenName}</td>
          <td class=" p-3">${userList[i].surname}</td>
          <td class=" p-3">${userList[i].displayName}</td>
          <td class="text-center py-2">
            <a href="./details.html?user=${userList[i].givenName}" target="_blank" rel="noopener noreferrer">
              <button id="${userList[i].givenName}" type="button" class="btn btn-details">Details</button>
            </a>
          </td>
        </tr>`

      table.append(row)
    }


    // userList.forEach(user => {
    //   // console.log(user)
    //   const users = Object.keys(user)
    //   // console.log(users, user[users])

    //   const row = `
    //     <tr class="row-table">
    //     <td class=" p-3">${users}</td>
    //     <td class=" p-3">${user[users].lastName}</td>
    //     <td class=" p-3">${user[users].userName}</td>
    //     <td class="text-center py-2">
    //       <a href="./details.html?user=${user[users].userName}" target="_blank" rel="noopener noreferrer"><button id="${user[users].userName}" type="button" class="btn btn-details">Details</button></a>
    //     </td>`

    //   table.append(row)
    // });

    pageButtons(data.pages)
  }

}
