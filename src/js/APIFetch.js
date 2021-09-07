let auth_token = null;
let auth_expired = true;

async function fetchData(url, params){

  if(auth_expired){
    const form = new FormData();
    form.append("client_id", "33e1eeb8-42dc-4586-9008-f60ab864b323");
    form.append("client_secret", "ZaW_Z~lK57I0k5mo25L-I9ntQrL8X~-cnK");
    form.append("tenant", "538be7cd-7660-4a22-ba89-4020cd5c8d6a");
    form.append("grant_type", "client_credentials");
    form.append("scope", "https://graph.microsoft.com/.default");

    const response = await fetch("https://login.microsoftonline.com/538be7cd-7660-4a22-ba89-4020cd5c8d6a/oauth2/v2.0/token", {
      "method": "POST",
      "headers": {
        "cookie": "fpc=Ag6lhKxVjYJNm4CJED-6pRl-yE7dAgAAAPStudgOAAAA; x-ms-gateway-slice=estsfd; stsservicecookie=estsfd",
        "Content-Type": "multipart/form-data; boundary=---011000010111000001101001"
      }
    })
    
    const tokenData = await response.json()
    auth_token = tokenData.access_token

    setTimeout(() => {
      auth_token = null
      auth_expired = true
    }, tokenData.expires_in);
  }

  if(params.headers){
    params.headers.Authorization = `Bearer ${auth_token}`
  }else{
    params.headers = {
      Authorization: `Bearer ${auth_token}`
    }
  }
  return fetch(url, params)
}