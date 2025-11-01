<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import { searchProductAPI } from "$lib/api/productAPI";
	import { addTransactionItemsAPI, editTransactionItemsAPI } from "$lib/api/transactionAPI";
	import type { addedItemsForm, typeProductForm } from "$lib/type/productType";
	import type { DetailItems } from "$lib/type/transactionType.js";
	import { ButtonGroup, Table, TableHead, TableHeadCell, TableBody, TableBodyRow, TableBodyCell, Input, Dropdown, Search, DropdownGroup, Spinner, Card, Badge, Helper, Modal, Button } from "flowbite-svelte";
	import { UserCircleSolid, UserAddOutline, AddColumnAfterOutline } from "flowbite-svelte-icons";
let currency = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" });
let dropdownOpen = $state(false);
let searchLoad = $state(false);
let duplicateAlert = $state(false);
let loading = $state(false);
let interval: NodeJS.Timeout;
let searchSize = $state(120);
let searched: typeProductForm[] = $state([]);
let searchQuery = $state('');
let addedItems: addedItemsForm[] = $state([]);
let addedItemsGrandTotal = $derived(addedItems.reduce((accum, { product_price, product_quantity }) => accum + (product_price * product_quantity), 0));
let confirmPopup = $state(false);
let loadingPopup = $state(false);
let successPopup = $state(false);
let failedPopup = $state(false);
const { trxId } = page.params;
let { data } = $props();

let editedItems: DetailItems[] = $state(data.transaction_items);
let activeStock = $state('');
let lastStock = $state(0);

  $effect(() => {
    if(dropdownOpen){
      const width = document.getElementById('product-input')?.offsetWidth;
      if(width) searchSize = width;
    }
  })

  async function searchHandler(){
    interval? clearTimeout(interval) : '';
    searchLoad = true;
    searched = [];
    interval = setTimeout(async () => {
      const response = await searchProductAPI(searchQuery);
      const { data } = await response.json();
      searchLoad = false;
      searched = data;
    }, 350)
  }

  async function pushProduct(product: typeProductForm) {
    const isAdded = addedItems.find(e => e.product_id === product.product_id);

    if(isAdded){
      duplicateAlert = true;
      return;
    }
    const productToPush = {...product, initial_quantity: product.product_quantity};
    addedItems.push(productToPush);
    
    searched = searched.filter(sProduct => sProduct.product_id !== product.product_id);
  }

  async function orderItemHandler(){
    if(!trxId) {
      return;
    }
    loadingPopup = true;
    failedPopup = false;

    const requestItems = addedItems.map(({initial_quantity, ...rest}) => rest);
    const response = await addTransactionItemsAPI(trxId, requestItems);

    loadingPopup = false;
    if(response.status === 201){
      successPopup = true;
      await goto(`/transactions/${trxId}/view`);
    }
    failedPopup = true;
  };

  async function updateItemsHandler(item: DetailItems) {
    loadingPopup = true;
    failedPopup = false;

    const response = await editTransactionItemsAPI(item);

    loadingPopup = false;
    if(response.status === 200){
      successPopup = true;
    }
    failedPopup = true;
  }

  async function checkStock(id: string){

  }
  
</script>

<head><title>Transaction Items</title></head>

<div class="flex flex-col h-[95%] gap-3 p-2">
  <div>
    <ButtonGroup class="w-full" id="product-input">
      <Search size="md" bind:value={searchQuery} disabled oninput={searchHandler}/>
        <Dropdown class="mt-0! bg-white/40 backdrop-blur-2xl rounded-t-none!" bind:isOpen={dropdownOpen}>
          <DropdownGroup style="width: {searchSize.toString()}px" class="h-24 overflow-y-auto {searchLoad || searched.length === 0? "content-center text-center" : ""}">
            {#if searchLoad}
              <Spinner class="me-3 text-center" size="12" />
            {/if}
            {#if searched.length === 0 && !searchLoad}
              <span>We can't see any data here!</span>
            {/if}
            {#each searched as product}
                  <!-- svelte-ignore a11y_click_events_have_key_events -->
                    <!-- svelte-ignore a11y_no_static_element_interactions -->
                  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
                <li onclick={() => pushProduct(product)} class="rounded-sm p-1 hover:bg-gray-100 dark:hover:bg-gray-600">
                  <span>{product.product_name}</span>
                </li>
            {/each}
          </DropdownGroup>
        </Dropdown>     
      <!-- <Input class="cursor-pointer!" id="new-transaction-customer" onclick={() => dropdownOpen = true} bind:value={newTransactionCustomer} disabled/> -->
     </ButtonGroup>
            
  </div>
  <div class="flex h-full flex-row bg-white/30 rounded-md shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]">
    <form class="flex h-full flex-row p-2 gap-2">
      <div style="scrollbar-width: none;" class="max-h-11/12 overflow-scroll w-4/6 max-w-4/6">
        <Table striped class="w-full border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] table-fixed" hoverable={true}>
          <TableHead class=" bg-transparent">
            <TableHeadCell class="w-[20%]">ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell class="w-[25%]">Quantity</TableHeadCell>
            <TableHeadCell class="w-[15%]"></TableHeadCell>
          </TableHead>
          <TableBody>
            {#each editedItems as item}
            <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
              <TableBodyCell>{item.product_id}</TableBodyCell>
              <TableBodyCell>{item.product_name}</TableBodyCell>
              <TableBodyCell>
                <Input type="number" bind:value={item.product_quantity} required/>
                <!-- <Button size="sm" class="w-full" onclick={()=> checkStock(item.product_id)}>Stock: 
                  {#if activeStock === item.product_id}
                    <Helper>{lastStock}</Helper>
                  {/if} -->
                <!-- </Button> -->
              </TableBodyCell>
              <TableBodyCell onclick={() => updateItemsHandler(item)}>Confirm</TableBodyCell>
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
              <span class="text-md font-bold">{currency.format(addedItemsGrandTotal)}</span>
              <span class="text-sm self-end">{addedItems.length} Items</span>
            </div>
            <Badge rounded color="red">Unpaid</Badge>
          </div>
        </Card>
      </div>
      {#if confirmPopup}
            <Modal title="Order Confirmation" form bind:open={confirmPopup} headerClass="pb-0!" bodyClass="pt-0!">
                {#if loadingPopup}
                    <Spinner class="me-3" size="16" />Editing ...
                {:else if successPopup}
                    <UserAddOutline/> Success, order has been created.
                {:else if failedPopup} Failed creating.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a new transaction will be created!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> orderItemHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirmPopup = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}
    </form>
  </div>
</div>