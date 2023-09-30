<script lang="ts">
	import type { User } from '@prisma/client';

	import Icon from '@iconify/svelte';
	import Avatar from '$components/Avatar.svelte';
	import MenuItem from './MenuItem.svelte';
	import { LoginModalOpened, RegisterModalOpened, RentModalOpened } from '../../stores';
	import { signOut } from '@auth/sveltekit/client';

	export let currentUser: User | null = null;
	let isOpen = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
	function OpenRegister() {
		RegisterModalOpened.set(true);
	}
	function OpenLogin() {
		LoginModalOpened.set(true);
	}
	function onRent() {
		if (!currentUser) {
			return OpenLogin();
		}
		RentModalOpened.set(true);
	}
</script>

<div class="relative">
	<div class="flex flex-row items-center gap-3">
		<button
			class="hidden cursor-pointer rounded-full px-3 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
			on:click={onRent}
		>
			Airbnb your home
		</button>
		<div
			class="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
			on:click={toggleOpen}
			on:keydown={(e) => e.key === 'Enter' && toggleOpen()}
			role="button"
			tabindex="0"
		>
			<Icon icon="fa6-solid:bars" />
			<div class="hidden md:block">
				<Avatar src={currentUser?.image} />
			</div>
		</div>
	</div>
	{#if isOpen}
		<div
			class="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
		>
			{#if !currentUser}
				<div class="flex cursor-pointer flex-col">
					<MenuItem onClick={OpenLogin} label="Login" />
					<MenuItem onClick={OpenRegister} label="Sign up" />
				</div>
			{:else}
				<div class="flex cursor-pointer flex-col">
					<MenuItem onClick={() => {}} label="My trips" />
					<MenuItem onClick={() => {}} label="My favourites" />
					<MenuItem onClick={() => {}} label="My reservations" />
					<MenuItem onClick={() => {}} label="My properties" />
					<MenuItem onClick={() => {}} label="Airbnb my home" />
					<hr />
					<MenuItem onClick={signOut} label="Logout" />
				</div>
			{/if}
		</div>
	{/if}
</div>
