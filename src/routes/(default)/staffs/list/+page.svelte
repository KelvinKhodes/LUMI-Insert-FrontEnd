<script lang="ts">
	import { editStaffAPI, getStaffAPI } from "$lib/api/userAPI";
	import type { getStaffDataType } from "$lib/type/userType";
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, Heading, Button, Modal, ButtonGroup, InputAddon, Label, Input, Alert, Spinner, GradientButton, Select, ListPlaceholder } from "flowbite-svelte";
	import { UserEditOutline, AddColumnAfterOutline, UserCircleSolid, UserAddOutline, InfoCircleSolid } from "flowbite-svelte-icons";
	import { onMount } from "svelte";
  
  let staffList: getStaffDataType[] = $state([]);
  let failed: boolean = $state(false)
  let failedEdit: boolean = $state(false)
  let badPayload = $state(false);
  let confirm = $state(false);
  let success = $state(false);
  let loading = $state(false);
  let openForm = $state(false);
  let fetching = $state(true);

  let editForm: getStaffDataType = $state({
    id: '',
    username: '',
    fullname: '',
    role: '',
  })

let role = [
  { value: "ADMIN", name: "ADMIN" },
  { value: "OWNER", name: "OWNER" },
]

  onMount(async () => {
    const response = await getStaffAPI();
    fetching = false;
    if(response.status === 200){
      const { data } = await response.json();
      staffList = data;
      return;
    }
    
    failed = true;
    return;
  })

async function editBtn(staff: getStaffDataType) {
  editForm = staff;
  openForm = true;
}

async function staffEditingHandler() {
    loading = true;
    if(editForm.username.length < 4 || editForm.role.length < 4 || editForm.fullname.length < 4){
        badPayload = true;
        confirm = false;
        loading = false;
        return;
    }
    const response = await editStaffAPI(editForm);
    const resJson = await response.json();

    if(response.status === 201 && resJson.data === "Success Updating User"){
        loading = false;
        success = true;
    }

    loading = false;
    failedEdit = true;
}
  
</script>

<head><title>Staff Management</title></head>

<div class="flex flex-col p-2">
  <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">New Staff Listing</Heading>

  <Table class="bg-white/50 rounded-t-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]" hoverable={true}>
    <TableHead class=" bg-transparent">
      <TableHeadCell>Staff Username</TableHeadCell>
      <TableHeadCell>Staff Fullname</TableHeadCell>
      <TableHeadCell>Staff Role</TableHeadCell>
      <TableHeadCell>
        <span class="sr-only">Edit</span>
      </TableHeadCell>
    </TableHead>
    <TableBody>
      {#if fetching}
      <TableBodyRow class="bg-transaparent hover:bg-transaparent">
        <TableBodyCell class="" colspan={4}>
          <ListPlaceholder class=" max-w-none" size="sm" />
        </TableBodyCell>
      </TableBodyRow>
      {/if}
      {#each staffList as staff}
      <TableBodyRow class=" bg-linear-to-tr from-white/30 to-white/20 bg-transparent! rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px]">
        <TableBodyCell>{staff.username}</TableBodyCell>
        <TableBodyCell>{staff.fullname}</TableBodyCell>
        <TableBodyCell>{staff.role}</TableBodyCell>
        <TableBodyCell>
          <Button pill={true} outline={false} class="p-2! bg-transparent!" onclick={() => editBtn(staff)} size="xl">
            <UserEditOutline class="w-3 h-3 text-blue-500 cursor-pointer"/>
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
  <Modal title="Staff Information Edit" form={false} bind:open={openForm} headerClass="pb-0!" bodyClass="pt-0!">
    <form onsubmit={() => confirm = true} class="h-full flex-1 flex flex-col gap-3 rounded-2xl">
            <Label for="new-staff-username" class=" block">Staff Username</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-username" bind:value={editForm.username}/>
            </ButtonGroup>

            <Label for="new-staff-fullname" class=" block">Staff Fullname</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-fullname" bind:value={editForm.fullname}/>
            </ButtonGroup>

            <Label for="new-staff-username" class=" block">Staff Role</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Select class="" items={role} bind:value={editForm.role} />
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
                    <UserAddOutline/> Success, {editForm.username} has been edited.
                {:else if failedEdit} Failed editing.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a user will be changed!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> staffEditingHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}

        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Edit</GradientButton>
      </form>
  </Modal>
