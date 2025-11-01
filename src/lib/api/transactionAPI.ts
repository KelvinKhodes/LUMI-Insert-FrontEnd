import type { typeProductForm } from "$lib/type/productType";
import type { DetailItems } from "$lib/type/transactionType";


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


export async function addTransactionItemsAPI(transaction_id: string, request: typeProductForm[]){
  return fetch(`/api/transactions/${transaction_id}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      transaction_items: request,
    })
  });
};

export async function getDetailTrxAPI(origin: string, cookies:string, id: string){
  return fetch(`http://localhost:3823/transactions/${id}`, {
    method: 'GET',
    headers: {
      Cookie: `LUMIALBCORS=${cookies}`
    },
    credentials: 'include'
  });
};


export async function editTransactionItemsAPI(item: DetailItems){
  return fetch(`/api/transactions/${item.transaction_id}/items/${item.refTransaction_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      transaction_items: {
        product_quantity: item.product_quantity
      }
    })
  });
};

export async function getTransactionAPI(){
  return fetch(`/api/transactions`, {
    method: 'GET',
  })
};