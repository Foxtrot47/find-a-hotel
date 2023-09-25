<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { User } from '@prisma/client';
	import { FavouriteIds, LoginModalOpened } from '../stores';
	import { invalidateAll } from '$app/navigation';

	export let listingId: string;
	export let userId: string | undefined;

	$: hasFavourited = () => {
		if (!$FavouriteIds) return false;
		return $FavouriteIds.includes(listingId);
	};
	const toggleFavourite = async (e: Event) => {
		e.stopPropagation();
		try {
			if (!userId) {
				$LoginModalOpened = true;
			}
			let response;
			if (hasFavourited()) {
				$FavouriteIds = $FavouriteIds.filter((id: string) => id !== listingId);
				response = await fetch(`/api/favourites/${listingId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userId })
				});
			} else {
				$FavouriteIds = [...$FavouriteIds, listingId];
				response = await fetch(`/api/favourites/${listingId}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ userId })
				});
			}
			const data = await response.json();
			$FavouriteIds = data.favouriteIds;
			invalidateAll();
		} catch (ex) {
			console.log(ex);
		}
	};
</script>

<button class="relative cursor-pointer transition hover:opacity-80" on:click={toggleFavourite}>
	<Icon
		icon="ant-design:heart-outlined"
		class="absolute -right-[2px] -top-[2px] h-7 w-7 text-white"
	/>
	<Icon
		icon="ant-design:heart-filled"
		class={`h-6 w-6 ${hasFavourited() ? 'text-rose-500' : 'text-neutral-500/70'}`}
	/>
</button>
