import { getDetailTrxAPI } from '$lib/api/transactionAPI.js';
import { error, redirect } from '@sveltejs/kit';

export async function load({cookies, url, params }) {
  if (params.trxId) {
    const token = cookies.get('LUMIALBCORS') || '';
    const result = await getDetailTrxAPI(url.origin, token, params.trxId);
    const { data } = await result.json();
    if(result.status !== 200) throw redirect(303, `/dashboard`);
    if(data.transaction_items.length === 0) throw redirect(303, `/transactions/${params.trxId}/create`);
    return {...data};
  }

  error(404, 'Not found');
}