import { redirect, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const accept = event.request.headers.get('accept');

  if (accept?.includes('text/html')) {
    const response = await fetch('http://localhost:3823/customers/search?name=PUBLIC', {
      headers: { 
        cookie: event.request.headers.get('cookie') ?? '' 
      }
    });
    
    const isValid = response.status === 200;
    console.log('Status', isValid)
    if(!isValid && event.url.pathname !== '/login') throw redirect(302, '/login');
    if(isValid && event.url.pathname === '/login') throw redirect(302, '/dashboard');
  }

  return resolve(event);
};