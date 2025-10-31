

export async function addTransactionAPI(customer_name: string){
  return fetch(`/api/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      transaction_customer_name: customer_name,
    })
  });
};

// export async function getProductAPI(){
//   return fetch(`/api/products`, {
//     method: 'GET',
//   });
// };


// export async function editProductAPI(product: registerProductForm){
//   return fetch(`/api/products/${product.product_id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     },
//     body: JSON.stringify({
//       ...product
//     })
//   });
// };