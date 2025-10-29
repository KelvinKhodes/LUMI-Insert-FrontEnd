<script lang="ts">
	import { Helper } from "flowbite-svelte";

	let props = $props();
</script>

<div class="{props.background} rounded-xl flex p-2 gap-2 group cursor-pointer m-1">
      <div class="{props.iconBg} rounded-xl p-1">
        <svelte:component this={props.icon} class="w-10 h-10" />
      </div>
      <div >
        <span class="{props.spanClass}">{props.data}</span>
        <Helper class="text-gray-100">{props.text}</Helper>
      </div>
</div>