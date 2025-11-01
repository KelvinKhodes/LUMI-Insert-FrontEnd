<script lang="ts">
import { registerStaffAPI } from "$lib/api/userAPI";
import { Heading, Label, ButtonGroup, InputAddon, Input, GradientButton, Spinner, Alert, Modal, Button} from "flowbite-svelte";
import { UserCircleSolid, InfoCircleSolid, AddColumnAfterOutline, UserAddOutline } from "flowbite-svelte-icons";

let badPayload = $state(false);
let confirm = $state(false);
let failed = $state(false);
let success = $state(false);
let loading = $state(false);

let newStaff = $state({
    username: '',
    password: '',
    fullname: ''
});

async function staffRegisterHandler() {
    loading = true;

    if(newStaff.username.length < 4 || newStaff.password.length < 4 || newStaff.fullname.length < 4){
        badPayload = true;
        confirm = false;
        loading = false;
        return;
    }

    const response = await registerStaffAPI(newStaff);
    const resJson = await response.json();

    if(response.status === 201 && resJson.data === "Success Registering User"){
        loading = false;
        success = true;
    }

    loading = false;
    failed = true;
};
</script>

<head><title>Staff Register</title></head>

<div class="flex flex-row p-2">
  <form onsubmit={() => confirm = true} class="h-full flex-1 w-0 flex flex-col gap-3 rounded-2xl">
        <Heading tag="h1" class="font-bold  md:text-xl lg:text-xl text-white">New Staff Form</Heading>
            <Label for="new-staff-username" class="mb-2 block">Staff Username</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-username" placeholder="SintiAKT" bind:value={newStaff.username} required />
            </ButtonGroup>

            <Label for="new-staff-fullname" class="mb-2 block">Staff Fullname</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-fullname" placeholder="Sinti Putri Sele" bind:value={newStaff.fullname} required/>
            </ButtonGroup>

            <Label for="new-staff-username" class="mb-2 block">Staff Password</Label>
            <ButtonGroup class="w-full">
                <InputAddon>
                <UserCircleSolid class="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </InputAddon>
                <Input id="new-staff-username" type="password" bind:value={newStaff.password} required/>
            </ButtonGroup>

            {#if badPayload}
                <Alert dismissable>
                    {#snippet icon()}<InfoCircleSolid class="h-5 w-5" />{/snippet}
                    Bad payload, each of form has to be more than 4 char!
                </Alert>
            {/if}

        {#if confirm}
            <Modal title="New Staff Confirmation" form bind:open={confirm} headerClass="pb-0!" bodyClass="pt-0!">
                {#if loading}
                    <Spinner class="me-3" size="16" />Registering ...
                {:else if success} <UserAddOutline/> Success, try to logon.
                {:else if failed} Failed registering.
                {:else}  
                    {#snippet icon()}
                        <AddColumnAfterOutline class="h-6 w-6" />
                    {/snippet}
                    <div class="mt-3">
                        <div class="mb-2 text-sm font-normal">By accepting this, a new user will be created!.</div>
                        <div class="grid grid-cols-2 gap-2">
                        <Button size="xs" class="w-full" onclick={()=> staffRegisterHandler()}>Agree</Button>
                        <Button size="xs" class="w-full" color="dark" onclick={()=> confirm = false}>Cancel</Button>
                        </div>
                    </div>  
                {/if}
            </Modal>
        {/if}
        <GradientButton type="submit" shadow color="blue" class={!loading? "cursor-pointer" : "cursor-loading"} disabled={loading}>Login</GradientButton>
      </form>
</div>