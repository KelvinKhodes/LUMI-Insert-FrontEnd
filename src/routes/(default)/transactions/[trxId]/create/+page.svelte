<script lang="ts">
	import { searchProductAPI } from "$lib/api/productAPI";
	import type { typeProductForm } from "$lib/type/productType";
	import { ButtonGroup, InputAddon, Input, Dropdown, Search, DropdownGroup, Spinner } from "flowbite-svelte";
	import { UserCircleSolid } from "flowbite-svelte-icons";

let dropdownOpen = $state(false);
let searchLoad = $state(false);
let duplicateAlert = $state(false);
let interval: NodeJS.Timeout;
let searchSize = $state(120);
let searched: typeProductForm[] = $state([]);
let searchQuery = $state('');
let addedItems: typeProductForm[] = $state([]);

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

    addedItems.push(product);
    searched = searched.filter(sProduct => sProduct.product_id !== product.product_id);
  }


  
</script>

<head><title>Transaction Items</title></head>

<div class="flex flex-col">
  <div>
    <ButtonGroup class="w-full" id="product-input">
      <Search size="md" bind:value={searchQuery} oninput={searchHandler}/>
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
  <div class="flex flex-row">

  </div>
</div>