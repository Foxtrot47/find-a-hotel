<script lang="ts">
	import type { PageData } from './$types';
	import Container from '$components/Container.svelte';
	import EmptyState from '$components/EmptyState.svelte';
	import ListingCard from '$components/Listings/ListingCard.svelte';
	import { format } from 'date-fns';
	import { FavouriteIds } from '../stores';

	const isEmpty = true;
	export let data: PageData;
	$: listings = data.listings;
	if (data?.currentUser?.favouriteIds) {
		$FavouriteIds = data.currentUser.favouriteIds;
	}
</script>

{#if listings.length <= 0}
	<EmptyState showReset={true} />
{:else}
	<Container>
		<div
			class="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each listings as listing (listing.id)}
				<ListingCard userId={data.currentUser?.id} data={listing} />
			{/each}
		</div>
	</Container>
{/if}

<svelte:head>
	<title>Holiday Homes & Apartment Rentals - Airbnb</title>
	<meta
		name="description"
		content="Airbnb home page. Here you can see thousands of listings people have created."
	/>
</svelte:head>
