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


export async function editProductAPI(product: registerProductForm){
  return fetch(`/api/products/${product.product_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...product
    })
  });
};