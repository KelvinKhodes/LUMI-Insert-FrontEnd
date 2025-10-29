<script lang="ts">
	import '../../app.css';
  import { Sidebar, SidebarGroup, SidebarItem, SidebarDropdownWrapper, SidebarButton, uiHelpers, NavBrand, Helper, ButtonGroup, Breadcrumb, BreadcrumbItem, Button } from "flowbite-svelte";
  import { ChartOutline, CartPlusOutline, UsersGroupOutline, GiftBoxOutline, UserSettingsOutline, MoonOutline, MessagesOutline, ExclamationCircleOutline } from "flowbite-svelte-icons";
  
  let username = "";
  import { page } from "$app/state";
	import insertLogo from '$lib/assets/LUMI INSERT Logo.png';
	import logo from '$lib/assets/LUMI Tagline.png';
  let trIsOpen = $state(false);
  let productIsOpen = $state(false);
  let customerIsOpen = $state(false);
  let staffIsOpen = $state(false);
  let activeUrl = $state(page.url.pathname);
  let activeUrlParse = $derived(activeUrl.split('/').slice(1));

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
  <Sidebar isSingle={true} {activeUrl} backdrop={false} isOpen={isDemoOpen} closeSidebar={closeDemoSidebar} params={{ x: -50, duration: 50 }} position="absolute" classes={{ nonactive: "group p-2 hover:bg-[rgb(88,101,129)] [&>span]:text-gray-300", active: "p-2 hover:bg-[rgb(88,101,129)] bg-[rgb(65,79,110)] [&>span]:text-gray-200 [&>svg]:text-gray-200", div: "bg-transparent" }} class="z-50 h-dvh w-[17vw] bg-linear-to-br from-gray-950 via-gray-900 to-gray-950 ">
    <NavBrand href="/">
    <img src={logo} class="me-3 pr-4 h-6 sm:h-9 border-r md:dark drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]" alt="Lumi Logo" />
    <img src={insertLogo} class="h-6 sm:h-9 drop-shadow-[0_5px_15px_rgba(0,0,0,0.4)]" alt="Insert Logo" />
  	</NavBrand>
		<SidebarGroup class="mt-2">

      <SidebarItem href="/dashboard" label="Dashboard" aClass="!ms-0 !p-1" spanClass="text-base text-gray-400 group-hover:text-gray-300 !ms-1 !me-2">
        {#snippet icon()}
          <ChartOutline class="h-4 w-4 text-gray-400 transition duration-75 group-hover:text-gray-300 mr-1" />
        {/snippet}
      </SidebarItem>

      <SidebarDropdownWrapper label="Transaction" svgClass="text-gray-400 transition duration-75 hover:text-gray-300 h-2 w-2" btnClass="p-1 hover:bg-[rgb(65,79,110)] hover:[&>span]:text-gray-300 {trIsOpen? "bg-[rgb(65,79,110)] [&>span]:text-gray-200 [&>svg]:text-gray-200": ""}" bind:isOpen={trIsOpen} spanClass="text-base text-gray-400 !ms-1 !me-2" ulClass="py-1">
        {#snippet icon()}
          <CartPlusOutline class="h-4 w-4 text-x text-gray-400 transition duration-75 group-hover:text-gray-300 mr-1" />
        {/snippet}
        <SidebarItem label="New Transaction" href="/transaction/new" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Transaction Management" href="/transaction/list" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Performance" aClass="!ms-2 !p-1" spanClass="text-xs"/>
      </SidebarDropdownWrapper>

      <SidebarDropdownWrapper label="Customer" svgClass="text-gray-400 transition duration-75 group-hover:text-gray-300 h-2 w-2" btnClass="p-1 hover:bg-[rgb(65,79,110)] has-[>span.active]:bg-yellow-500 {customerIsOpen? "bg-[rgb(65,79,110)] [&>span]:text-gray-200 [&>svg]:text-gray-200": ""}" bind:isOpen={customerIsOpen} spanClass="text-base text-gray-400 group-hover:text-gray-300 !ms-1 !me-2" ulClass="py-1">
        {#snippet icon()}
          <UsersGroupOutline class="h-4 w-4 text-gray-400 transition duration-75  group-hover:text-gray-300 mr-1" />
        {/snippet}
        <SidebarItem label="Add Customer" href="/customers/new" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Customer Management" href="/customers/list" aClass="!ms-2 !p-1" spanClass="text-xs"/>
      </SidebarDropdownWrapper>

			<SidebarDropdownWrapper label="Product" svgClass="text-gray-400 transition duration-75 group-hover:text-gray-300 h-2 w-2" btnClass="p-1 hover:bg-[rgb(65,79,110)] {productIsOpen? "bg-[rgb(65,79,110)] [&>span]:text-gray-200 [&>svg]:text-gray-200": ""}" bind:isOpen={productIsOpen} spanClass="text-base text-gray-400 group-hover:text-gray-300 !ms-1 !me-2" ulClass="py-1">
        {#snippet icon()}
          <GiftBoxOutline class="h-4 w-4 text-gray-400 transition duration-75 group-hover:text-gray-300 mr-1" />
        {/snippet}
        <SidebarItem label="List A Product" href="/products/new" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Product Management" href="/products/list" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Add Stocks" href="/products/stock" aClass="!ms-2 !p-1" spanClass="text-xs"/>
      </SidebarDropdownWrapper>

			<SidebarDropdownWrapper label="Staff" svgClass="text-gray-400 transition duration-75 group-hover:text-gray-300 h-2 w-2" btnClass="p-1 hover:bg-[rgb(65,79,110)] {staffIsOpen? "bg-[rgb(65,79,110)] [&>span]:text-gray-200 [&>svg]:text-gray-200": ""}" bind:isOpen={staffIsOpen} spanClass="text-base text-gray-400 group-hover:text-gray-300 !ms-1 !me-2" ulClass="py-1">
        {#snippet icon()}
          <UserSettingsOutline class="h-4 w-4 text-gray-400 transition duration-75 group-hover:text-gray-300 mr-1" />
        {/snippet}
        <SidebarItem label="New Staff" href="/staffs/new" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Staff Management" href="/staffs/list" aClass="!ms-2 !p-1" spanClass="text-xs"/>
        <SidebarItem label="Staff Logs" href="/staffs/logs" aClass="!ms-2 !p-1" spanClass="text-xs"/>
				<SidebarItem label="Dashboard Management" href="/staffs/dashboard" aClass="!ms-2 !p-1" spanClass="text-xs"/>
      </SidebarDropdownWrapper>

    </SidebarGroup>
  </Sidebar>
</div>

<div class="h-dvh overflow-auto px-4 md:ml-[17vw] flex flex-col">
  <div class="flex flex-row justify-between items-center p-3">
    <div>
      <span>Welcome, {username}</span>
      <Helper>Focus and Spirit is our key!</Helper>
    </div>
    <div>
      <ButtonGroup class="space-x-px">
        <Button class="bg-gray-500 border-0">
          <MoonOutline class="w-3 h-3"/>
        </Button>
        <Button class="bg-gray-500 border-0">
          <MessagesOutline class="w-3 h-3"/>
        </Button>
        <Button class="bg-gray-500 border-0">
          <ExclamationCircleOutline class="w-3 h-3"/>
        </Button>
      </ButtonGroup>
    </div>
  </div>
  <div class="m-3  p-2 bg-white/30 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] backdrop-blur-[6.1px] border border-white/30 h-dvh">
    <Breadcrumb aria-label="Default breadcrumb example">
      {#each activeUrlParse as page}
        <BreadcrumbItem spanClass="text-gray-400 text-xs !ms-1" class="[&>svg]:w-4 [&>svg]:h-4 me-0!">{page.charAt(0).toUpperCase() + page.slice(1)}</BreadcrumbItem>
      {/each}
    </Breadcrumb>
    {@render children?.()}
  </div>
</div>
  
