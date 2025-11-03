<script lang="ts">
	import { page } from "$app/state";
	import { getCustomerDetailAPI } from "$lib/api/customerAPI";
	import type { CustomerDetailResponse } from "$lib/type/customerType";
	import { error } from "@sveltejs/kit";
  import { MapLibre, Marker } from 'svelte-maplibre-gl';
	import { Card, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Button } from "flowbite-svelte";
	import { UserCircleSolid, EyeOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  let customerData:CustomerDetailResponse = $state({});
  let customerId = page.params.custId;

  onMount(async ()=> {
    if(!customerId) error(404, 'Not found!');

    const response = await getCustomerDetailAPI(customerId);
    const resJson = await response.json();

    if(response.status !== 200) error(400, resJson.error)
    customerData = resJson.data;

  })

</script>

<head><title>Customer Details</title></head>

<div class="flex flex-col gap-1">

  <div class="border-b border-gray-400 p-2 flex items-center gap-2">
    <UserCircleSolid class="{customerData.customer_status === "ACTIVE"? "text-green-500" : "text-red-500"} h-6 w-6"/>
    <h1>{customerData.customer_name}</h1>
  </div>

  <div class="flex">
    <Card class=" bg-white/20 backdrop-blur-2xl text-sm [&_h2]:font-bold p-1 gap-2 flex-[1 1]">
      <div>
        <h2>Customer's Contact</h2>
        <h3>{customerData.customer_contact}</h3>
      </div>
      <div>
      <h2>Customer's Address</h2>
      <h3>{customerData.customer_address}</h3>
      </div>
      <div>
      <h2>Customer's Since</h2>
      <h3>{customerData.customer_since}</h3>
      </div>
    </Card>

    <Card class="flex-[1 1] bg-white/20 backdrop-blur-2xl text-sm [&_h2]:font-bold p-1">
      {#if customerData.customer_lng}
      <MapLibre zoom={13} center={[customerData.customer_lng || 0, customerData.customer_lat || 0]} class="h-full" style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
        <Marker lnglat={[customerData.customer_lng || 0, customerData.customer_lat || 0]} />
      </MapLibre>
      {:else} <h4>There's no information about customer coordinates!</h4>
      {/if}
      
    </Card>
  </div>

  <div>
    <Table class="w-full h-full table-auto border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]" hoverable={true}>
      <TableHead class=" bg-transparent">
        <TableHeadCell>Date</TableHeadCell>
        <TableHeadCell>Status</TableHeadCell>
        <TableHeadCell>Total</TableHeadCell>
        <TableHeadCell>Handler</TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Func</span>
        </TableHeadCell>
      </TableHead>
      <TableBody class=" overflow-y-auto">
        {#each customerData.transaction as tr}
        <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
          <TableBodyCell>{tr.transaction_date}</TableBodyCell>
          <TableBodyCell>{tr.transaction_status}</TableBodyCell>
          <TableBodyCell>{tr.transaction_total}</TableBodyCell>
          <TableBodyCell>{tr.transaction_handler}</TableBodyCell>
          <TableBodyCell>
            <Button pill={true} outline={false} class="p-2! bg-transparent!" href="/transactions/{tr.transaction_id}/view" size="xl">
              <EyeOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
            </Button>
          </TableBodyCell>
        </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
  </div>

</div>
