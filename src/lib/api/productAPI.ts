import type { registerProductForm } from "$lib/type/productType";

export async function registerProductAPI(productRegister: registerProductForm){
  return fetch(`/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      product_id: productRegister.product_id,
      product_name: productRegister.product_name,
      product_quantity: productRegister.product_quantity,
      product_price: productRegister.product_price,
    })
  });
};

export async function getProductAPI(){
  return fetch(`/api/products`, {
    method: 'GET',
  });
};


// export async function editProductAPI(customer: getCustomerDataType){
//   return fetch(`/api/customers/${customer.customer_id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       customer_name: customer.customer_name,
//       customer_contact: customer.customer_contact,
//       customer_address: customer.customer_address,
//       customer_status: customer.customer_status
//     })
//   });
// };