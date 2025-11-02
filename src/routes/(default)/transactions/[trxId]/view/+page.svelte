<script lang="ts">
	import type { DetailItems } from "$lib/type/transactionType.js";
	import { Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Card, Badge } from "flowbite-svelte";
	import { UserCircleSolid } from "flowbite-svelte-icons";

let currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
let { data } = $props();
let editedItems: DetailItems[] = $state(data.transaction_items);
let totalItemsGrandTotal = $derived(editedItems.reduce((accum, { product_price, product_quantity }) => accum + (product_price * product_quantity), 0));
  
</script>

<head><title>Transaction Items</title></head>

<div class="flex flex-col h-[95%] gap-3 p-2">
  <div class="flex h-full flex-row bg-white/30 rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]">
    <form class="flex h-full flex-row p-2 gap-2">
      <div style="scrollbar-width: none;" class="max-h-11/12 overflow-scroll w-4/6 max-w-4/6">
        <Table striped class="w-full border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] table-fixed" hoverable={true}>
          <TableHead class=" bg-transparent">
            <TableHeadCell class="w-[20%]">ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell class="w-[25%]">Quantity</TableHeadCell>
            <TableHeadCell class="w-[15%]">Price</TableHeadCell>
          </TableHead>
          <TableBody>
            {#each editedItems as item}
            <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
              <TableBodyCell>{item.product_id}</TableBodyCell>
              <TableBodyCell>{item.product_name}</TableBodyCell>
              <TableBodyCell>{item.product_quantity}</TableBodyCell>
              <TableBodyCell>{item.product_price}</TableBodyCell>
            </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </div>

      <div class="flex flex-col w-2/6 max-w-2/6">
        <Card class="flex flex-col gap-2 p-2 bg-blue-600/50 backdrop-blur-3xl">
          <h3>Transaction Detail</h3>

          <div class="flex items-center gap-2">
            <UserCircleSolid color="black" class="w-6 h-6"/>
            <div class="leading-2!">
              <h4 class="text-[12px]">Customer Name</h4>
              <h5 class="text-sm font-bold">{data.transaction_customer_name}</h5>
            </div>
          </div>

          <div class="flex items-center justify-start gap-2 border-b border-b-gray-400">
            <UserCircleSolid class="w-6 h-6"/>
            <div class="leading-2!">
              <h4 class="text-[12px]">Transaction date</h4>
              <h5 class="text-sm font-bold">{data.transaction_date}</h5>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2 border-b border-b-gray-400">
            <div class="leading-2! flex flex-col">
              <span class="text-md font-bold">{currency.format(totalItemsGrandTotal)}</span>
              <span class="text-sm self-end">{editedItems.length} Items</span>
            </div>
            <Badge rounded color="red">Unpaid</Badge>
          </div>
        </Card>
      </div>
    </form>
  </div>
</div>