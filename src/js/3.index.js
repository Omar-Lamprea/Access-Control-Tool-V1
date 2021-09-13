// const { config } = require("npm")

document.addEventListener('DOMContentLoaded', e =>{

  const errorMessage = document.getElementById("errorMessage")

  async function getUsers() {
    try{
      // let response = await fetch('./locales/user.json')
      // let response = await fetchData("https://graph.microsoft.com/v1.0/users", {
      //   "method": "GET",
      // })

      // let response = await fetch("https://graph.microsoft.com/v1.0/users", {
      //   "method": "GET",
      //   "headers": {
      //     "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJub25jZSI6IlFnSmJhVWRnM0o4ekktaGdkbGNnRWNwQVQtV0FnbkxSWW1ybERQNWpvNEkiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiJodHRwczovL2dyYXBoLm1pY3Jvc29mdC5jb20iLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81MzhiZTdjZC03NjYwLTRhMjItYmE4OS00MDIwY2Q1YzhkNmEvIiwiaWF0IjoxNjMwNTE1NTcxLCJuYmYiOjE2MzA1MTU1NzEsImV4cCI6MTYzMDUxOTQ3MSwiYWlvIjoiRTJaZ1lQRE5YbEZ4dHBXMXlETG9yNlB4NlZ1bkFBPT0iLCJhcHBfZGlzcGxheW5hbWUiOiJHcmFwaCBBZXJvbmV4ICIsImFwcGlkIjoiMzNlMWVlYjgtNDJkYy00NTg2LTkwMDgtZjYwYWI4NjRiMzIzIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvNTM4YmU3Y2QtNzY2MC00YTIyLWJhODktNDAyMGNkNWM4ZDZhLyIsImlkdHlwIjoiYXBwIiwib2lkIjoiZWMyMDExNjItNjc3Mi00NTViLWFjZmYtYzAwOGU1ZDYwY2E5IiwicmgiOiIwLkFWQUF6ZWVMVTJCMklrcTZpVUFnelZ5TmFyanU0VFBjUW9aRmtBajJDcmhrc3lOUUFBQS4iLCJyb2xlcyI6WyJVc2VyLlJlYWRXcml0ZS5BbGwiLCJEaXJlY3RvcnkuUmVhZFdyaXRlLkFsbCIsIlVzZXIuSW52aXRlLkFsbCIsIkRpcmVjdG9yeS5SZWFkLkFsbCIsIlVzZXIuUmVhZC5BbGwiLCJVc2VyLkV4cG9ydC5BbGwiLCJVc2VyLk1hbmFnZUlkZW50aXRpZXMuQWxsIl0sInN1YiI6ImVjMjAxMTYyLTY3NzItNDU1Yi1hY2ZmLWMwMDhlNWQ2MGNhOSIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6IjUzOGJlN2NkLTc2NjAtNGEyMi1iYTg5LTQwMjBjZDVjOGQ2YSIsInV0aSI6ImZHek1uY2EwelVTTVBNREZqSFp4QUEiLCJ2ZXIiOiIxLjAiLCJ3aWRzIjpbIjA5OTdhMWQwLTBkMWQtNGFjYi1iNDA4LWQ1Y2E3MzEyMWU5MCJdLCJ4bXNfdGNkdCI6MTYyODUzNDk0MX0.cuGGlvouW9t4oZqLJxsJ2gK6GKQhj9rgQiDJ6YV3KR4Wkvh7aP99NS7u8KbEBIIiW_7Kld8wgPUBbvZNNSBePRnheF6hTsthwCABtEG_uzZ9o6dHJCx3Ee3Ihl9VDHd27_qiOjSI-1DEfSNF6N8d7RKMBLDIcL0nhrUkv7k155OWQQfJrfXG5X2cszUDGtERsj-vo_fHsZsPcXQnuarFdo-lwoRcut7ZOHYpN6VMFUCZWssWE862PC6H-fltZ2XaM6aSy7oEGlsRbKcuObw9PxiUYOrtWStLR94O4i2l73f4o6EHMlwvwCd174yc6VQ_iPPdxsyRDoPRazcBcypb_Q"
      //   }
      // })

      //new backend API:
      let response = await fetch('https://acsadmin.azurewebsites.net/api/UserApi',{
        "method" : "GET",
      })

      let usersJson = await response.json()
      //let usersValues = usersJson
      console.log(usersJson)
      console.log(response)

      if(!response.ok) throw {status: res.status, statusText:res.statusText}

      //call functions from root
      if(window.location.pathname === "/"){
        dataTable(usersJson)
        searchUsers(usersJson)
      }
      //call details user funcion if url => details.html
      window.location.pathname === "/details.html" ? openDetails(usersJson) : false

    }catch(err){
      console.log(err)
      let message = err.statusText || 'Ocurrió un error al cargar!'
      errorMessage.innerHTML = `Error ${err.status}: ${message}`
    }
  }
  getUsers()



  
  const authBtn = document.getElementById('authentication')
  authBtn.addEventListener('click', run)
  
  async function run(){
    console.log('running...')
  
    const config = {
      auth:{
        clientId: '72637f92-e33b-477d-afee-f73194a5f62e',
        authority: 'https://login.microsoftonline.com/common/',
        redirectUri: 'http://localhost:3000/',
      }
    }
  
    const client = new Msal.UserAgentApplication(config)
    
    const options = {
      scopes: ['user.read']
    }
    
    let loginResponse = await client.loginPopup(options)
    console.log('login: ', loginResponse) //login
  
    let tokenResponse = await client.acquireTokenSilent(options)
    console.log('token:', tokenResponse) //token
  
    let payload = await fetch('https://graph.microsoft.com/v1.0/me',{
      headers:{
        'Authorization' : 'Bearer ' + tokenResponse.accessToken
      }
    })
  
    let json = await payload.json();
    console.log('json:', json) //user auth
  
  
  
    
    // client.loginPopup()
  }


})


