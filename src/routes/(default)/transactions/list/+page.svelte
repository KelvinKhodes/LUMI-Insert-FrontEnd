<script lang="ts">
	import { getTransactionAPI } from "$lib/api/transactionAPI";
	import type { TransactionRegisteredPayload } from "$lib/type/transactionType";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Button, ListPlaceholder, Pagination } from "flowbite-svelte";
	import { EyeOutline, PenOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  
  let transactionList: TransactionRegisteredPayload[] = $state([]);
  let failed: boolean = $state(false)
  let fetching = $state(true);
  let inactive = $state(false);

  let helper = $state({
     start: 0, 
     end: 0, 
     total: 0
  });

  onMount(async () => {
    await nextPageHandler();
  });

async function nextPageHandler(limit: number = 5) {
  inactive = false;
  if(helper.end === helper.total && helper.total) return;
  const response = await getTransactionAPI(transactionList.at(-1)?.transaction_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      transactionList = data.transaction_data;
      helper.start = helper.end + 1;
      helper.end = helper.end + data.transaction_data.length;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}

async function previousPageHandler(limit: number = -5) {
  inactive = false;
  if(helper.start === 1) return;
  const response = await getTransactionAPI(transactionList.at(0)?.transaction_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      transactionList = data.transaction_data;
      helper.end = helper.start - 1;
      helper.start = helper.end - 4;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}
  
</script>

<head><title>Transaction Management</title></head>

<div class="flex flex-col p-3 h-full justify-between">
  <div>
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
</div>
  <div class="text-sm text-gray-700 dark:text-gray-400 text-center">
      Showing <span class="font-semibold text-gray-900 dark:text-white">{helper.start}</span>
      to
      <span class="font-semibold text-gray-900 dark:text-white">{helper.end}</span>
      of
      <span class="font-semibold text-gray-900 dark:text-white">{helper.total}</span>
      Entries
      <Pagination table previous={previousPageHandler} next={nextPageHandler} />
  </div>
  {#if failed}
    <span class=" text-center">We can't get the data, try to refresh!</span>  
  {/if}
</div>
