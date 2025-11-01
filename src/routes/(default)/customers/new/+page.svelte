<script lang="ts">
import { registerCustomerAPI } from "$lib/api/customerAPI";
import { Heading, Label, ButtonGroup, InputAddon, Input, GradientButton, Spinner, Alert, Modal, Button} from "flowbite-svelte";
import { UserCircleSolid, InfoCircleSolid, AddColumnAfterOutline, UserAddOutline } from "flowbite-svelte-icons";

let badPayload = $state(false);
let confirm = $state(false);
let failed = $state(false);
let success = $state(false);
let loading = $state(false);

let newCustomer = $state({
    name: '',
    contact: '',
    address: ''
});

async function staffRegisterHandler() {
    loading = true;

    if(newCustomer.name.length < 4 || newCustomer.contact.length < 4 || newCustomer.address.length < 4){
        badPayload = true;
        confirm = false;
        loading = false;
        return;
    }

    const response = await registerCustomerAPI(newCustomer);
    const resJson = await response.json();

    if(response.status === 201 && resJson.data){
        loading = false;
        success = true;
    }

    loading = false;
    failed = true;
};
</script>

<head><title>Customer Register</title></head>

<div class="flex flex-row p-2">
  <form onsubmit={() => confirm = true} class="h-full flex-1 w-0 flex flex-col gap-3 rounded-2xl">
        <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">New Customer Form</Heading>
            <Label for="new-customer-name" class="mb-2 block">Customer Name</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-customer-name" placeholder="PT. -" bind:value={newCustomer.name} required/>
            </ButtonGroup>

            <Label for="new-customer-contact" class="mb-2 block">Customer Contact</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-customer-contact" placeholder="WhatsApp - 08xxxxxx - Pak Andre" bind:value={newCustomer.contact} required/>
            </ButtonGroup>

            <Label for="new-customer-address" class="mb-2 block">Customer Address</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-customer-address" placeholder="Komp. Pergudangan xxx" bind:value={newCustomer.address} required/>
            </ButtonGroup>

            {#if badPayload}
                <Alert dismissable>
                    {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
                    Bad payload, each of form has to be more than 4 char!
                </Alert>
            {/if}

        {#if confirm}
            <Modal title="New Customer Confirmation" form bind:open={confirm} headerClass="pb-0!" bodyClass="pt-0!" onclose={() => {success=false; failed=false;}}>
                {#if loading}
                    <Spinner class="me-3" size="16" />Registering ...
                {:else if success} <UserAddOutline/> Success, new customer added.
                {:else if failed} Failed registering.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a new customer will be created!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> staffRegisterHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}
        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Registering</GradientButton>
      </form>
</div>