import type { loginForm, registerStaffForm } from "$lib/type/userType";

export async function loginAPI(user: loginForm){
  return fetch(`/api/authentications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: user.username,
      password: user.password
    })
  })
}

export async function registerStaffAPI(staffRegister: registerStaffForm){
  return fetch(`/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      username: staffRegister.username,
      password: staffRegister.password,
      fullname: staffRegister.fullname
    })
  })
}