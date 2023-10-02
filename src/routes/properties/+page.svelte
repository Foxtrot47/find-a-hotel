<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import EmptyState from '$components/EmptyState.svelte';
	import Heading from '$components/Heading.svelte';
	import Container from '$components/Container.svelte';
	import ListingCard from '$components/Listings/ListingCard.svelte';

	export let data: PageData;

	const onDelete = async (id: string) => {
		deletingId = id;
		const deleteResponse = await fetch(`/api/listing?listingId=${id}`, {
			method: 'DELETE'
		});

		if (!deleteResponse.ok) {
			deletingId = '';
			return;
		}
		invalidateAll();
	};
	let deletingId = '';
</script>

{#if data.currentUser == null || data.listings == null}
	<EmptyState title="Unauthorized" subTitle="Please login to continue" />
{:else if data.listings !== null && data.listings.length > 0}
	<Container>
		<Heading title="Properties" subTitle="List of your properties" />
		<div
			class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each data.listings as listing}
				<ListingCard
					key={listing.id}
					data={listing}
					actionId={listing.id}
					onAction={onDelete}
					disabled={deletingId === listing.id}
					actionLabel="Delete property"
					currentUser={data.currentUser}
				/>
			{/each}
		</div>
	</Container>
{:else}
	<EmptyState title="No properties found" subTitle="Looks like you have no properties." />
{/if}
