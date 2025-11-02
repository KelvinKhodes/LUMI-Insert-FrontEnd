<script lang="ts">
	import { getTransactionAPI } from "$lib/api/transactionAPI";
	import type { TransactionRegisteredPayload } from "$lib/type/transactionType";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Button, ListPlaceholder } from "flowbite-svelte";
	import { EyeOutline, PenOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  
  let transactionList: TransactionRegisteredPayload[] = $state([]);
  let failed: boolean = $state(false)
  let fetching = $state(true);
  let inactive = $state(false);

  onMount(async () => {
    activeFetchHandler();
  });

async function activeFetchHandler() {
  inactive = false;
  const response = await getTransactionAPI();
    fetching = false;
    if(response.status === 200){
      const { data } = await response.json();
      transactionList = data;
      return;
    }
    
    failed = true;
    return;
}
  
</script>

<head><title>Transaction Management</title></head>

<div class="flex flex-col p-2">
  <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">Transaction Listing</Heading>
  <Table class="w-full table-auto border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]" hoverable={true}>
    <TableHead class=" bg-transparent">
      <TableHeadCell>Customer</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
      <TableHeadCell>Date</TableHeadCell>
      <TableHeadCell>Total</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Func</span>
      </TableHeadCell>
    </TableHead>
    <TableBody>
      {#if fetching}
      <TableBodyRow class="bg-transaparent hover:bg-transaparent">
        <TableBodyCell  colspan={5}>
          <ListPlaceholder class=" max-w-none" size="sm" />
        </TableBodyCell>
      </TableBodyRow>
      {/if}
      {#each transactionList as transaction}
      <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
        <TableBodyCell>{transaction.transaction_customer_name}</TableBodyCell>
        <TableBodyCell>{transaction.transaction_status}</TableBodyCell>
        <TableBodyCell>{transaction.transaction_date}</TableBodyCell>
        <TableBodyCell>{transaction.transaction_total}</TableBodyCell>
        <TableBodyCell>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" href="/transactions/{transaction.transaction_id}/view" size="xl">
            <EyeOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
          </Button>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" href="/transactions/{transaction.transaction_id}/edit" size="xl">
            <PenOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
          </Button>
        </TableBodyCell>
      </TableBodyRow>
      {/each}
    </TableBody>
  </Table>

  {#if failed}
    <span class=" text-center">We can't get the data, try to refresh!</span>  
  {/if}
</div>
