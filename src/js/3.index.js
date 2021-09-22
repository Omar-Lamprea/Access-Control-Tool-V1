// const { config } = require("npm")
// const authBtn = document.getElementById('authentication')

document.addEventListener('DOMContentLoaded', run)


const config = {
  auth:{
    clientId: '72637f92-e33b-477d-afee-f73194a5f62e',
    authority: 'https://login.microsoftonline.com/common/',
    redirectUri: 
      // 'https://acsadminfe.azurewebsites.net/',
      'http://localhost:3000/',
    postLogoutRedirectUri: 
      // 'https://acsadminfe.azurewebsites.net/',
      'http://localhost:3000',
    
      
    // "instance":' https://login.microsoftonline.com/',
    // "domain": "ACview.azurewebsites.net",
    // "clientId": "7ec568e5-033c-421b-b7ea-77dd87a9a511",
    // "tenantId": "174fb423-3af6-41a6-8d0d-750f9ba0a663",
    // "callbackPath": "/signin-oidc"
  }
}

const options = {
  scopes: [
    'user.read',
    "openid",
    "profile"
  ]
}

const client = new Msal.UserAgentApplication(config)

function run(){
  const loginData = localStorage.getItem('login')
  loginData ? showApp() : showLogin()
}

function showApp(){
  const table = document.getElementById('main-table')
  getUsers()
  table.classList.remove('d-none')
  // console.log(localStorage.getItem('login'))
  
  const logOut = document.getElementById('log-out')
  logOut.addEventListener('click', e =>{
    client.logout();
    localStorage.clear();
    sessionStorage.clear()
    
    window.location.reload()
  })
}

function showLogin(){
  const loginStyles = document.querySelector('body')
  const login = document.getElementById('login-page')

  loginStyles.classList.add('login-style')
  login.classList.remove('d-none')
  login.querySelector('button').addEventListener('click', signIn)
}

//Authentication User:
async function signIn(evt){
  const btn = evt.target
  const loader = document.getElementById('loader-login')

  try{
    btn.classList.add('d-none')
    loader.classList.remove('d-none')
    console.log('running...')
  
    let loginResponse = await client.loginPopup(options)
    console.log('login: ', loginResponse) //login
    
    let tokenResponse = await client.acquireTokenSilent(options)
    console.log('token:', tokenResponse) //token
  
    localStorage.setItem('token', tokenResponse.accessToken)
  
    let payload = await fetch('https://graph.microsoft.com/v1.0/me',{
      headers:{
        'Authorization' : 'Bearer ' + localStorage.getItem('token')
      }
    })
  
    let json = await payload.json();
    console.log('json:', json) //user auth
    localStorage.setItem('login', json.userPrincipalName)
  
  
    //call Users API:
    // payload.status === 200 ? getUsers() : console.log('access dennied')
    
    window.location.reload()

  }catch(error){
    btn.classList.remove('d-none')
    loader.classList.add('d-none')
    console.error(error)
  }

}



async function getUsers() {
  const errorMessage = document.getElementById("errorMessage")
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
      "method" : "GET"
    })

    let usersJson = await response.json()
    //let usersValues = usersJson
    // console.log(usersJson)
    console.log('status:',response.status)


    if(!response.ok) throw {status: response.status, statusText:response.statusText}

    //call functions from root
    if(window.location.pathname === "/"){
      dataTable(usersJson)
      searchUsers(usersJson)
    }

    //call details user funcion if url => details.html
    usersJson.forEach(user => {
      // console.log(window.location.search,`?user=${user.givenName}`)
      // console.log(`/details.html?user=${user.givenName}`)
      window.location.search === `?user=${user.givenName}` ? openDetails(user) : false
    });

  }catch(err){
    console.log(err)
    let message = err.status || 'An error occurred while loading!'
    errorMessage.innerHTML = `Error ${err.status}: ${message}`
  }
}



