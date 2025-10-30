<script lang="ts">
	import { registerProductAPI } from "$lib/api/productAPI";
import { Heading, Label, ButtonGroup, InputAddon, Input, GradientButton, Spinner, Alert, Modal, Button} from "flowbite-svelte";
import { UserCircleSolid, InfoCircleSolid, AddColumnAfterOutline, UserAddOutline } from "flowbite-svelte-icons";

let badPayload = $state(false);
let confirm = $state(false);
let failed = $state(false);
let success = $state(false);
let loading = $state(false);

let newProduct = $state({
    product_id: '',
    product_name: '',
    product_quantity: '',
    product_price: ''
});

async function productRegisterHandler() {
    loading = true;
    if(newProduct.product_quantity === '' || newProduct.product_quantity === ''){
      badPayload = true;
      confirm = false;
      loading = false;
      return;
    }
    const response = await registerProductAPI(newProduct);
    const resJson = await response.json();

    if(response.status === 201 && resJson.data){
        loading = false;
        success = true;
    }

    loading = false;
    failed = true;
};
</script>

<head><title>Product Register</title></head>

<div class="flex flex-row p-2">
  <form onsubmit={() => confirm = true} class="h-full flex-1 w-0 flex flex-col gap-3 rounded-2xl">
        <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">New Product Form</Heading>
        <Label for="new-product-id" class="mb-2 block">Product ID</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-product-id" placeholder="STAREX-009" bind:value={newProduct.product_id} required/>
            </ButtonGroup>

            <Label for="new-product-name" class="mb-2 block">Product Name</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-product-name" placeholder="Baja Aseko Tipe Y Per Pcs" bind:value={newProduct.product_name} required/>
            </ButtonGroup>

            <Label for="new-product-quantity" class="mb-2 block">Product Quantity</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-product-quantity" type="number" placeholder="12" bind:value={newProduct.product_quantity} required/>
            </ButtonGroup>

            <Label for="new-product-price" class="mb-2 block">Product Price</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <span class="h-4 w-4 text-gray-500 dark:text-gray-400">Rp</span>
                </InputAddon>
                <Input id="new-product-price" type="number" placeholder="15000" bind:value={newProduct.product_price} required/>
            </ButtonGroup>

            {#if badPayload}
                <Alert dismissable>
                    {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
                    Bad payload, cannot be empty!
                </Alert>
            {/if}

        {#if confirm}
            <Modal title="New Product Confirmation" form bind:open={confirm} headerClass="pb-0!" bodyClass="pt-0!" onclose={() => {success=false; failed=false;}}>
                {#if loading}
                    <Spinner class="me-3" size="16" />Registering ...
                {:else if success} <UserAddOutline/> Success, new Product added.
                {:else if failed} Failed registering.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a new Product {newProduct.product_name} with Quantities: {newProduct.product_quantity
                          } and price of Rp{newProduct.product_price} will be created!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> productRegisterHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}
        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Registering</GradientButton>
      </form>
</div>