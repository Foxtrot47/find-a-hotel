<script lang="ts">
	import EmptyState from '$components/EmptyState.svelte';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Heading from '$components/Heading.svelte';
	import Container from '$components/Container.svelte';
	import ListingCard from '$components/Listings/ListingCard.svelte';

	export let data: PageData;

	const onCancel = async (id: string) => {
		deletingId = id;
		const deleteResponse = await fetch(`/api/reservations?reservationId=${id}`, {
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

{#if data.currentUser == null || data.reservations == null}
	<EmptyState title="Unauthorized" subTitle="Please login to continue" />
{:else if data.reservations.length > 0}
	<Container>
		<Heading title="Reservations" subTitle="Bookings on your properties" />
		<div
			class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each data.reservations as reservation}
				<ListingCard
					key={reservation.id}
					data={reservation.listing}
					{reservation}
					actionId={reservation.id}
					onAction={onCancel}
					disabled={deletingId === reservation.id}
					actionLabel="Cancel guest reservation"
					currentUser={data.currentUser}
				/>
			{/each}
		</div>
	</Container>
{:else}
	<EmptyState title="No reservations found" subTitle="Looks like you have no reservations on your properties." />
{/if}

<svelte:head>
    <title>My Reservations - Airbnb</title> 
	<meta name="description" content="This page shows all the guest reservations on your property." />
</svelte:head>