<script lang="ts">
	import type { PageData } from './$types';
	import Container from '../components/Container.svelte';
	import EmptyState from '../components/EmptyState.svelte';
	import ListingCard from '../components/Listings/ListingCard.svelte';

	const isEmpty = true;
	export let data: PageData;
	$: listings = data.listings;
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
