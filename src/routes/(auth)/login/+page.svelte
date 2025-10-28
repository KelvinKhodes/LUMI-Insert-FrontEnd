<script lang="ts">
	import { goto } from "$app/navigation";
	import { loginAPI } from "$lib/api/userAPI";
  import { FloatingLabelInput } from "flowbite-svelte";
  import { InfoCircleSolid } from "flowbite-svelte-icons"
  import { GradientButton, Spinner, Alert, Heading, FooterCopyright, Carousel, CarouselIndicators, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from "flowbite-svelte";
	import { statusDay } from "$lib/helper/textGenerator";
  import logo from '$lib/assets/LUMI Tagline.png';
  import { images } from "./image";
	import { fly } from "svelte/transition";
	import { page } from "$app/state";
  import insertLogo from '$lib/assets/LUMI INSERT Logo.png';

  let loading = $state(false);
  let failed = $state(false);
  let day = statusDay();
  let activeUrl = $derived(page.url.pathname);
  let nonActiveClass = "text-gray-300 md:hover:text-white font-semibold text-10px";
  let activeClass = "md:text-blue-500 md:hover:text-blue-500 font-bold text-10px";

  let loginForm = $state({
    username: '',
    password: '',
  });

  async function loginHandler(e: SubmitEvent){
    console.log('Test');
    e.preventDefault();
    loading = true;

    const response = await loginAPI(loginForm);
    const resJson = await response.json();

    if(response.status === 200 && resJson.success === "true"){
      await goto('dashboard');
    }

    loading = false;
    failed = true;
  }
</script> 

<head><title>Login</title></head>

<div class="h-screen flex flex-col ">
  <Navbar>
  <NavBrand href="/">
    <img src={logo} class="me-3 pr-4 h-6 sm:h-9 border-r md:dark " alt="Lumi Logo" />
    <img src={insertLogo} class="h-6 sm:h-9" alt="Insert Logo" />
  </NavBrand>
  <NavHamburger />
  <NavUl {activeUrl} classes = {{active: activeClass, nonActive: nonActiveClass}} >
    <NavLi href="/">Home</NavLi>
    <NavLi href="/login">Login</NavLi>
    <NavLi href="/docs">API Docs</NavLi>
    <NavLi href="/about">About</NavLi>
  </NavUl>
</Navbar>
  <div class="h-full w-full flex flex-col items-center justify-around bg-linear-to-r from-gray-900 via-gray-700 to-gray-900">
    <div transition:fly={{delay: 300, x: 0, y: 80, duration: 1000 }} class="flex flex-row w-[40%] h-[60%] rounded-2xl p-4 gap-2.5 bg-gray-800 backdrop-blur-lg shadow-blue-100">
      <div class="flex-1 w-0 shadow-xl">
        <Carousel {images} duration={3900} class=" object-cover sm:h-full xl:h-full 2xl:h-full" imgClass="">
          <CarouselIndicators />
        </Carousel>
      </div>
      <form action="POST" onsubmit={loginHandler} class="h-full flex-1 w-0 flex flex-col gap-3 rounded-2xl">
        <img src={logo} class=" w-25 self-center-safe" alt="Lumi Insert - Illuminate your bussiness">
        <Heading tag="h1" class="font-bold  md:text-xl lg:text-2xl text-white">Good {day}, friend...</Heading>
        <FloatingLabelInput classes={{input:"text-gray-200", label:"bg-gray-800 text-gray-400"}} variant="outlined" id="login_username" name="login_username" bind:value={loginForm.username} color="sky" type="text" required>
          Your username here...
        </FloatingLabelInput>
        <FloatingLabelInput classes={{input:"text-gray-200", label:"bg-gray-800 text-gray-400"}} variant="outlined" id="login_password" name="login_password" bind:value={loginForm.password} color="sky" type="password" required>
          Password goes here...
        </FloatingLabelInput>
        {#if failed && !loading}
          <Alert dismissable>
          {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
          Wrong credentials, try to contact administrators!
        </Alert>
        {/if}
        <GradientButton type="submit" shadow color="blue" >
          
          {#if loading}
          <Spinner class="me-3" size="4" />Loading ...
          {:else}Login
          {/if} 
        </GradientButton>

        <FooterCopyright class=" justify-self-end-safe" href="/" by="LUMI System™" />
      </form>
    </div>
  </div>
</div>
