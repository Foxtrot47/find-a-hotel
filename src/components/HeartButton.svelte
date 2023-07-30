<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { User } from '@prisma/client';

	export let listingId: string;
	export let userId: string | undefined;

	const hasFavourited = false;
	const toggleFavourite = () => {};
</script>

<button class="relative cursor-pointer transition hover:opacity-80" on:click={toggleFavourite}>
	<Icon
		icon="ant-design:heart-outlined"
		class="absolute -right-[2px] -top-[2px] h-7 w-7 text-white"
	/>
	<Icon
		icon="ant-design:heart-filled"
		class={`h-6 w-6 ${hasFavourited ? 'text-rose-500' : 'text-neutral-500/70'}`}
	/>
</button>
