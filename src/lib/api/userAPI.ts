import type { loginForm } from "$lib/type/userType";

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