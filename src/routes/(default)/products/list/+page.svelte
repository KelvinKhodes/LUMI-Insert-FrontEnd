<script lang="ts">
	import { editProductAPI, getProductAPI } from "$lib/api/productAPI";
	import type { registerProductForm } from "$lib/type/productType";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Button, Modal, ButtonGroup, InputAddon, Label, Input, Alert, Spinner, GradientButton, ListPlaceholder, Pagination } from "flowbite-svelte";
	import { UserEditOutline, AddColumnAfterOutline, UserCircleSolid, UserAddOutline, InfoCircleSolid } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  
  let productList: registerProductForm[] = $state([]);
  let failed: boolean = $state(false)
  let failedEdit: boolean = $state(false)
  let badPayload = $state(false);
  let confirm = $state(false);
  let success = $state(false);
  let loading = $state(false);
  let openForm = $state(false);
  let fetching = $state(true);
  let inactive = $state(false);

  let editForm: registerProductForm = $state({
    product_id: '',
    product_name: '',
    product_quantity: '',
    product_price: '',
  })

  let helper = $state({
     start: 0, 
     end: 0, 
     total: 0
  });
  $inspect(helper).with(console.trace);

  onMount(async () => {
   await nextPageHandler();
  });

async function editBtn(product: registerProductForm) {
  editForm = product;
  openForm = true;
}

async function nextPageHandler(limit: number = 5) {
  inactive = false;
  if(helper.end === helper.total && helper.total) return;
  const response = await getProductAPI(productList.at(-1)?.product_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      productList = data.product_data;
      helper.start = helper.end + 1;
      helper.end = helper.end + data.product_data.length;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}

async function previousPageHandler(limit: number = -5) {
  inactive = false;
  if(helper.start === 1) return;
  const response = await getProductAPI(productList.at(0)?.product_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      productList = data.product_data;
      helper.end = helper.start - 1;
      helper.start = helper.end - 4;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}

async function productEditingHandler() {
    loading = true;

    if(editForm.product_quantity === '' || editForm.product_quantity === ''){
      badPayload = true;
      confirm = false;
      loading = false;
      return;
    }

    const response = await editProductAPI(editForm);
    const resJson = await response.json();

    if(response.status === 200 && resJson.data){
        loading = false;
        success = true;
    }

    loading = false;
    failedEdit = true;
}
  
</script>

<head><title>Product Management</title></head>

<div class="flex flex-col p-2 h-full justify-between">
  <div>
  <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">Product Listing</Heading>
  <Table class="w-full table-auto border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]" hoverable={true}>
    <TableHead class=" bg-transparent">
      <TableHeadCell>ID</TableHeadCell>
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Quantity</TableHeadCell>
      <TableHeadCell>Price</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
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
      {#each productList as product}
      <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
        <TableBodyCell>{product.product_id}</TableBodyCell>
        <TableBodyCell>{product.product_name}</TableBodyCell>
        <TableBodyCell>{product.product_quantity}</TableBodyCell>
        <TableBodyCell>{product.product_price}</TableBodyCell>
        <TableBodyCell>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" onclick={() => editBtn(product)} size="xl">
            <UserEditOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
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
      <Pagination class="" table previous={previousPageHandler} next={nextPageHandler} />
  </div>
    
  {#if failed}
    <span class=" text-center">We can't get the data, try to refresh!</span>  
  {/if}
</div>
  <Modal title="Product Information Edit" form={false} bind:open={openForm} headerClass="pb-0!" bodyClass="pt-0!">
    <form onsubmit={() => confirm = true} class="h-full flex-1 flex flex-col gap-3 rounded-2xl">
            <Label for="new-staff-username" class=" block">Product ID</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-username" bind:value={editForm.product_id}/>
            </ButtonGroup>

            <Label for="new-staff-fullname" class=" block">Product Name</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-fullname" bind:value={editForm.product_name}/>
            </ButtonGroup>

            <Label for="new-staff-fullname" class=" block">Product Quantities</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-fullname" type="number" disabled bind:value={editForm.product_quantity}/>
            </ButtonGroup>

            <Label for="new-product-price" class=" block">Product Price</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-product-price" type="number" bind:value={editForm.product_price}/>
            </ButtonGroup>

            {#if badPayload}
                <Alert dismissable>
                    {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
                    Bad payload, each of form has to be more than 4 char!
                </Alert>
            {/if}

        {#if confirm}
            <Modal title="Edit Confirmation" form bind:open={confirm} headerClass="pb-0!" bodyClass="pt-0!" onclose={() => openForm = false}>
                {#if loading}
                    <Spinner class="me-3" size="16" />Editing ...
                {:else if success}
                    <UserAddOutline/> Success, {editForm.product_name} has been edited.
                {:else if failedEdit} Failed editing.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a customer will be changed!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> productEditingHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}

        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Edit</GradientButton>
      </form>
  </Modal>
