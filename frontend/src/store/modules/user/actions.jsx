export function loginRequest(email, password) {
  return {
     type: 'LOGIN_REQUEST',
     email,
     password,
  };
}

export function loginSuccess(user)
{
     return {
     type: 'LOGIN_SUCCESS',
     user,
     };
}

export function registerRequest(email, password, name, userImage) 
{
  return {
     type: 'REGISTER_REQUEST',
     email,
     password,
     name,
     userImage,
  };
}    


export function registerSuccess(user)
{
     return {
     type: 'REGISTER_SUCCESS',
     user,
     };
}


export function logoutRequest()
{
     return {
     type: 'LOGOUT_REQUEST',
     };
}

export function logoutSuccess()    
{
     return {
     type: 'LOGOUT_SUCCESS',
     };
}


export function checkRequest()
{
     return {
     type: 'CHECK_REQUEST',
     };
}