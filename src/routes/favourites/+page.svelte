<script lang="ts">
	import EmptyState from '$components/EmptyState.svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Heading from '$components/Heading.svelte';
	import Container from '$components/Container.svelte';
	import ListingCard from '$components/Listings/ListingCard.svelte';

	export let data: PageData;

</script>



{#if data.currentUser == null || data.listings == null}
	<EmptyState title="Unauthorized" subTitle="Please login to continue" />
{/if}
{#if data.listings !== null && data.listings.length > 0}
	<Container>
		<Heading title="Favorites" subTitle="List of places you favorited!" />
		<div
			class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each data.listings as listing}
				<ListingCard
					key={listing.id}
					data={listing}
					currentUser={data.currentUser}
				/>
			{/each}
		</div>
	</Container>
{:else}
    <EmptyState title="No favourites found" subTitle="Looks like you have no favourites listings."/>
{/if}
