import type { getCustomerDataType, registerCustomerForm } from "$lib/type/customerType";

export async function registerCustomerAPI(customerRegister: registerCustomerForm){
  return fetch(`/api/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      customer_name: customerRegister.name,
      customer_contact: customerRegister.contact,
      customer_address: customerRegister.address
    })
  })
}

export async function getCustomerAPI(id: string = 'first', limit: number){
  return fetch(`/api/customers?last=${id}&limit=${limit}`, {
    method: 'GET',
  });
};

export async function getInactiveCustomerAPI(id: string = 'first', limit: number){
  return fetch(`/api/customers/inactive?last=${id}&limit=${limit}`, {
    method: 'GET',
  });
};

export async function editCustomerAPI(customer: getCustomerDataType){
  return fetch(`/api/customers/${customer.customer_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      customer_name: customer.customer_name,
      customer_contact: customer.customer_contact,
      customer_address: customer.customer_address,
      customer_status: customer.customer_status
    })
  });
};

export async function searchCustomerAPI(query: string) {
  return fetch(`/api/customers/search?name=${query}`, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
  })
}