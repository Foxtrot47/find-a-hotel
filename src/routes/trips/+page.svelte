<script lang="ts">
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';
	import Container from '$components/Container.svelte';
	import EmptyState from '$components/EmptyState.svelte';
	import Heading from '$components/Heading.svelte';
	import ListingCard from '$components/Listings/ListingCard.svelte';
	import type { Reservation } from '@prisma/client';

	export let data: PageData;

    const onCancel = async (id: string) => {
        deletingId = id;
		const deleteResponse = await fetch(`/api/reservations?reservationId=${id}`, { method: 'DELETE' })

		if (!deleteResponse.ok) {
			deletingId = "";
			return;
		}
		invalidateAll();
		
    }
    let deletingId = "";
</script>

{#if data.reservations.length <= 0}
	<Container>
		<EmptyState title="No trips found" subTitle="Looks like you havent reserved any trips." />
	</Container>
{:else}
	<Container>
		<Heading title="Trips" subTitle="Where you've been and where you're going" />
		<div
			class="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
		>
			{#each data.reservations as reservation (reservation.id)}
				<ListingCard
					key={reservation.id}
					data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel="Cancel reservation"
				/>
			{/each}
		</div>
	</Container>
{/if}
