<script>
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import Avatar from '../Avatar.svelte';
    import MenuItem from './MenuItem.svelte';

	let isOpen = false;

	const toggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<svelte>
	<div class="relative">
		<div class="flex flex-row items-center gap-3">
			<div
				class="hidden cursor-pointer rounded-full px-3 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
			>
				Airbnb your home
			</div>
			<div
				class="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
				on:click={toggleOpen}
				on:keydown={(e) => e.key === 'Enter' && toggleOpen()}
				role="button"
				tabindex="0"
			>
				<Fa icon={faBars} />
				<div class="hidden md:block">
					<Avatar />
				</div>
			</div>
		</div>
		{#if isOpen}
			<div
				class="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4"
			>
            <div class="flex flex-col cursor-pointer">
                <MenuItem onClick={() => {}} label="Login" />
                <MenuItem onClick={() => {}} label="Sign up" />
            </div>
            </div>  
		{/if}
	</div>
</svelte>
