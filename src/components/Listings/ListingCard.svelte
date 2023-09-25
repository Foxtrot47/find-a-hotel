<script lang="ts">
	import type { Listing, Reservation } from '@prisma/client';
	import { format } from 'date-fns';
	import { getByValue } from '../Inputs/Countries';
	import HeartButton from '../HeartButton.svelte';
	import Button from '../Button.svelte';

	export let data: Listing;
	export let reservation: Reservation | null;
	export let onAction: (id: string) => void;
	export let disabled: boolean = false;
	export let actionLabel: string = '';
	export let actionId: string = '';
	export let userId: string | undefined;

	const location = getByValue(data.locationValue);
	const handleCancel = (e: Event) => {
		e.stopPropagation();

		if (disabled) return;
		onAction?.(actionId);
	};
	const price = reservation ? reservation.totalPrice : data.price;
	const reservationDate = () => {
		if (!reservation) return null;
		const startDate = new Date(reservation.startDate);
		const endDate = new Date(reservation.endDate);
		return `${format(startDate, 'PP')} - ${format(endDate, 'PP')}`;
	};
</script>

<button class="group col-span-1 cursor-pointer">
	<div class="flex w-full flex-col gap-2">
		<div class="relative aspect-square w-full overflow-hidden rounded-xl">
			<img
				src={data.imageSrc}
				alt="Listing"
				class="h-full w-full object-cover transition group-hover:scale-110"
			/>
			<div class="absolute right-3 top-3">
				<HeartButton listingId={data.id} {userId} />
			</div>
		</div>
		<div class="text-lg font-semibold">
			{location?.region}, {location?.label}
		</div>
		<div class="font-light text-neutral-500">
			{reservationDate() || data.category}
		</div>
		<div class="flex flex-row items-center gap-1">
			<div class="font-semibold">
				$ {price}
			</div>
			{#if !reservation}
				<div class="font-light">night</div>
			{/if}
			{#if actionLabel}
				<Button {disabled} small label={actionLabel} onClick={handleCancel} />
			{/if}
		</div>
	</div>
</button>
