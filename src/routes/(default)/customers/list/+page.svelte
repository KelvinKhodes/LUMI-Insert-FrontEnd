<script lang="ts">
	import { editCustomerAPI, getCustomerAPI, getInactiveCustomerAPI } from "$lib/api/customerAPI";
	import type { getCustomerDataType, updateCustomer } from "$lib/type/customerType";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Button, Modal, ButtonGroup, InputAddon, Label, Input, Alert, Spinner, GradientButton, Select, ListPlaceholder, Pagination } from "flowbite-svelte";
	import { UserEditOutline, AddColumnAfterOutline, UserCircleSolid, UserAddOutline, InfoCircleSolid, UserSolid, EyeSlashSolid, EyeSolid, EyeOutline } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  
  let customerList: getCustomerDataType[] = $state([]);
  let failed: boolean = $state(false)
  let failedEdit: boolean = $state(false)
  let badPayload = $state(false);
  let confirm = $state(false);
  let success = $state(false);
  let loading = $state(false);
  let openForm = $state(false);
  let fetching = $state(true);
  let inactive = $state(false);

  let editForm: updateCustomer = $state({
    customer_id: '',
    customer_name: '',
    customer_contact: '',
    customer_address: '',
    customer_status: '',
    customer_lat: 0,
    customer_lng: 0
  })

  let custStatus = [
    { value: "ACTIVE", name: "ACTIVE" },
    { value: "SUSPENDED", name: "INACTIVE" },
  ]

  let helper = $state({
      start: 0, 
      end: 0, 
      total: 0
  });

  onMount(async () => {
    nextPageHandler();
  });

async function editBtn(customer: updateCustomer) {
  editForm = customer;
  openForm = true;
}

async function inactiveHandler(){
  inactive = !inactive;
  helper.start = 0;
  helper.end = 0;
  helper.total = 0;
  customerList = [];
  await nextPageHandler();
}

async function nextPageHandler(limit: number = 5) {
  if(helper.end === helper.total && helper.total) return;
  const response = !inactive? await getCustomerAPI(customerList.at(-1)?.customer_id, limit) : await getInactiveCustomerAPI(customerList.at(-1)?.customer_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      customerList = data.customer_data;
      helper.start = helper.end + 1;
      helper.end = helper.end + data.customer_data.length;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}

async function previousPageHandler(limit: number = -5) {
  if(helper.start === 1) return;
  const response = !inactive? await getCustomerAPI(customerList.at(0)?.customer_id, limit) : await getInactiveCustomerAPI(customerList.at(0)?.customer_id, limit);
  fetching = false;

    if(response.status === 200){
      const { data } = await response.json();
      customerList = data.customer_data;
      helper.end = helper.start - 1;
      helper.start = helper.end - 4;
      helper.total = data.total_rows
      return;
    }
    
    failed = true;
    return;
}

async function customerEditingHandler() {
    loading = true;
    if(editForm.customer_name.length < 4 || editForm.customer_contact.length < 4 || editForm.customer_address.length < 4){
        badPayload = true;
        confirm = false;
        loading = false;
        return;
    }
    const response = await editCustomerAPI(editForm);
    const resJson = await response.json();

    if(response.status === 200 && resJson.data){
        loading = false;
        success = true;
    }

    loading = false;
    failedEdit = true;
}
  
</script>

<head><title>Customer Management</title></head>

<div class="flex flex-col p-2 h-full justify-between">
  <div>
  <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">Customer Listing</Heading>
  <Button class="bg-gray-400 border-0 rounded-b-none! shadow-none {inactive? "bg-red-700/80" : ""}" onclick={inactiveHandler}>
    {#if !inactive}
      <EyeSlashSolid class="w-3 h-3"/>
    {:else}<EyeSolid class="w-3 h-3"/>
    {/if}
          
  </Button>
  <Table class="w-full table-auto border-collapse bg-white/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]" hoverable={true}>
    <TableHead class=" bg-transparent">
      <TableHeadCell>Name</TableHeadCell>
      <TableHeadCell>Contact</TableHeadCell>
      <TableHeadCell>Address</TableHeadCell>
      <TableHeadCell>Status</TableHeadCell>
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
      {#each customerList as customer}
      <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] text-xs">
        <TableBodyCell>{customer.customer_name}</TableBodyCell>
        <TableBodyCell>{customer.customer_contact}</TableBodyCell>
        <TableBodyCell>{customer.customer_address}</TableBodyCell>
        <TableBodyCell>
          {#if customer.customer_status === "ACTIVE"}
            <UserSolid class="text-green-800 w-3 h-3"/>
          {:else} <UserSolid class="text-red-800 w-3 h-3"/>
          {/if}
        </TableBodyCell>
        <TableBodyCell>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" href="/customers/{customer.customer_id}/view" size="xl">
            <EyeOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
          </Button>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" onclick={() => editBtn(customer)} size="xl">
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
      <Pagination table previous={previousPageHandler} next={nextPageHandler} />
  </div>
  {#if failed}
    <span class=" text-center">We can't get the data, try to refresh!</span>  
  {/if}
</div>
  <Modal title="Customer Information Edit" form={false} bind:open={openForm} headerClass="pb-0!" bodyClass="pt-0!">
    <form onsubmit={() => confirm = true} class="h-full flex-1 flex flex-col gap-3 rounded-2xl">
            <Label for="new-name" class=" block">Customer Name</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-name" bind:value={editForm.customer_name}/>
            </ButtonGroup>

            <Label for="new-contact" class=" block">Customer Contact</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-contact" bind:value={editForm.customer_contact}/>
            </ButtonGroup>

            <Label for="new-address" class=" block">Customer Address</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-address" bind:value={editForm.customer_address}/>
            </ButtonGroup>

            <Label for="new-status" class=" block">Customer Status</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Select id="new-status" items={custStatus} bind:value={editForm.customer_status} />
            </ButtonGroup>

            <div class="flex">
              <div>
                <Label for="new-latitude" class=" block">Customer Latitude</Label>
                <ButtonGroup class="w-full">
                  <InputAddon>
                    <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </InputAddon>
                  <Input id="new-latitude" type="number" step="any" bind:value={editForm.customer_lat} />
                </ButtonGroup>
              </div>

              <div>
                <Label for="new-longitude" class=" block">Customer Longitude</Label>
                <ButtonGroup class="w-full">
                  <InputAddon>
                    <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </InputAddon>
                  <Input id="new-longitude" type="number" step="any" bind:value={editForm.customer_lng} />
                </ButtonGroup>
              </div>
            </div>

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
                    <UserAddOutline/> Success, {editForm.customer_name} has been edited.
                {:else if failedEdit} Failed editing.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a customer will be changed!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> customerEditingHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}

        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Edit</GradientButton>
      </form>
  </Modal>
