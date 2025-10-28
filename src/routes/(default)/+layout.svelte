<script lang="ts">
	import '../../app.css';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarDropdownWrapper, SidebarButton, uiHelpers, NavBrand } from "flowbite-svelte";
  import { ChartOutline, CartPlusOutline, UsersGroupOutline, GiftBoxOutline, UserSettingsOutline, EditSolid, ShoppingBagSolid } from "flowbite-svelte-icons";
  import { page } from "$app/state";
	import insertLogo from '$lib/assets/LUMI INSERT Logo.png';
	import logo from '$lib/assets/LUMI Tagline.png';

  let activeUrl = $state(page.url.pathname);
  const spanClass = "flex-1 ms-3 whitespace-nowrap";
  const demoSidebarUi = uiHelpers();
  let isDemoOpen = $state(false);
  const closeDemoSidebar = demoSidebarUi.close;
  $effect(() => {
    isDemoOpen = demoSidebarUi.isOpen;
    activeUrl = page.url.pathname;
  });
	let { children } = $props();
</script>

<svelte:head>
</svelte:head>

<SidebarButton onclick={demoSidebarUi.toggle} class="mb-2" />
<div class="relative">
	
  <Sidebar isSingle={false} {activeUrl} backdrop={false} isOpen={isDemoOpen} closeSidebar={closeDemoSidebar} params={{ x: -50, duration: 50 }} position="absolute" classes={{ nonactive: "p-2", active: "p-2" }} class="z-50 h-dvh w-[17vw]">
    <NavBrand href="/">
    <img src={logo} class="me-3 pr-4 h-6 sm:h-9 border-r md:dark drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]" alt="Lumi Logo" />
    <img src={insertLogo} class="h-6 sm:h-9 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]" alt="Insert Logo" />
  	</NavBrand>
		<SidebarGroup class="mt-2">
      <SidebarItem label="Dashboard" aClass="!ms-0 !p-1" spanClass="text-xs !ms-3">
        {#snippet icon()}
          <ChartOutline class="h-4 w-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white mr-1" />
        {/snippet}
      </SidebarItem>
      <SidebarDropdownWrapper label="Transaction" btnClass="p-1" spanClass="text-xs">
        {#snippet icon()}
          <CartPlusOutline class="h-4 w-4 text-x text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white mr-1" />
        {/snippet}
        <SidebarItem label="New Transaction" href="/transaction/new" aClass="!ms-2" spanClass="text-[8px]"/>
        <SidebarItem label="Transaction Management" href="/transaction/list"/>
        <SidebarItem label="Performance" />
      </SidebarDropdownWrapper>
      <SidebarDropdownWrapper label="Customer" btnClass="p-1" spanClass="text-xs">
        {#snippet icon()}
          <UsersGroupOutline class="h-4 w-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white mr-1" />
        {/snippet}
        <SidebarItem label="Add Customer" href="/customers/new" />
        <SidebarItem label="Customer Management" href="/customers/list"/>
      </SidebarDropdownWrapper>
			<SidebarDropdownWrapper label="Product" btnClass="p-1" spanClass="text-xs">
        {#snippet icon()}
          <GiftBoxOutline class="h-4 w-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white mr-1" />
        {/snippet}
        <SidebarItem label="List A Product" href="/products/new" />
        <SidebarItem label="Product Management" href="/products/list"/>
        <SidebarItem label="Add Stocks" href="/products/stock"/>
      </SidebarDropdownWrapper>
			<SidebarDropdownWrapper label="Staff" btnClass="p-1" spanClass="text-xs">
        {#snippet icon()}
          <UserSettingsOutline class="h-4 w-4 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white mr-1" />
        {/snippet}
        <SidebarItem label="New Staff" href="/products/new" />
        <SidebarItem label="Staff Management" href="/products/list"/>
        <SidebarItem label="Staff Logs" href="/products/stock"/>
				<SidebarItem label="Dashboard Management" href="/products/stock"/>
      </SidebarDropdownWrapper>
    </SidebarGroup>
  </Sidebar>
</div>
<div class="h-96 overflow-auto px-4 md:ml-64">{@render children?.()}</div>
