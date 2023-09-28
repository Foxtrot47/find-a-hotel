<script lang="ts">
	import type { PageData } from './$types';
	import SveltyPicker from 'svelty-picker';
	import { parseISO } from 'date-fns';
	import type { Listing, Reservation, User } from '@prisma/client';
	import { categoriesList } from '../../../components/Navbar/Categories';
	import Container from '../../../components/Container.svelte';
	import { getByValue } from '../../../components/Inputs/Countries';
	import Heading from '../../../components/Heading.svelte';
	import HeartButton from '../../../components/HeartButton.svelte';
	import Avatar from '../../../components/Avatar.svelte';
	import Icon from '@iconify/svelte';
	import Map from '../../../components/Map.svelte';
	import { LoginModalOpened } from '../../../stores';

	import Button from '../../../components/Button.svelte';

	export let data: PageData;
	const listing: Listing = data.listings;
	const reservations: Reservation[] = data.reservations;

	// Data served from +layout.server.ts
	const currentuser: User = data.currentUser;

	$: location = getByValue(listing.locationValue);
	$: coordinates = location?.latlng;

	$: category = categoriesList.find((category) => category.label === listing.category);

	const initialDateRange = [new Date(), new Date()];

	let dates: Date[] = [];

	const isDateOutsideReservations = (dateToCheck: Date, reservations: Reservation[]): boolean => {
		for (const reservation of reservations) {
			if (
				Date.parse(dateToCheck.toString()) >= Date.parse(reservation.startDate.toString()) &&
				Date.parse(dateToCheck.toString()) <= Date.parse(reservation.endDate.toString())
			) {
				return false; // Date is within a reservation range
			}
		}
		return true; // Date is outside all reservation ranges
	};

	$: isloading = false;
	$: totalPrice = listing.price;
	$: dateRange = initialDateRange;

	const onCreateReservation = async () => {
		if (!currentuser) {
			$LoginModalOpened = true;
		} else if (dateRange[0] || dateRange[1]) {
			isloading = true;
			try {
				const response = await fetch(`/api/reservations`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						listingId: listing.id,
						totalPrice,
						startDate: dateRange[0],
						endDate: dateRange[1]
					})
				});
				dateRange = initialDateRange;
				//window.location.href = '/trips';
			} catch (error) {
				alert('Something went wrong, please try again.');
				console.error(error);
			} finally {
				isloading = false;
			}
		}
	};

	$: {
		if (dateRange[0] || dateRange[1]) {
			const timeDifference = dateRange[0].getTime() - dateRange[1].getTime();
			const dayCount = Math.abs(timeDifference / (1000 * 3600 * 24));
			if (dayCount && dateRange[1]) {
				totalPrice = dayCount * listing.price;
			} else {
				totalPrice = listing.price;
			}
		}
	}
</script>

<Container>
	<div class="mx-auto max-w-screen-lg">
		<div class="flex flex-col gap-6">
			<Heading title={listing.title} subTitle={`${location?.label}, ${location?.region}`} />
			<div class="relative h-[60vh] w-full overflow-hidden rounded-xl">
				<img src={listing.imageSrc} alt="Location" class="w-full object-cover" />
				<div class="absolute right-5 top-5">
					<HeartButton listingId={listing.id} userId={listing.userId} />
				</div>
			</div>
			<div class="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
				<div class="col-span-4 flex flex-col gap-8">
					<div class="flex flex-col gap-2">
						<div class="flex flex-row items-center gap-2 text-xl font-semibold">
							<div>Hosted by {listing.user?.name}</div>
							<Avatar src={listing.user?.imageSrc} />
						</div>
						<div class="flex flex-row items-center gap-4 font-light text-neutral-500">
							<div>{listing.guestCount} guests</div>
							<div>{listing.roomCount} rooms</div>
							<div>{listing.bathroomCount} bathrooms</div>
						</div>
					</div>
					<hr />
					{#if category}
						<div class="flex flex-col gap-6">
							<div class="items center flex flex-row gap-4">
								<Icon icon={category.icon} class="text-5xl text-neutral-600" />
								<div class="flex flex-col">
									<div class="text-lg font-semibold">
										{category.label}
									</div>
									<div class="font-light text-neutral-500">
										{category.description}
									</div>
								</div>
							</div>
						</div>
					{/if}
					<hr />
					<div class="text-lg font-light text-neutral-500">
						{listing.description}
					</div>
					<hr />
					{#if coordinates}
						<Map center={coordinates} />
					{/if}
				</div>
				<div class="order-first mb-10 md:order-last md:col-span-3">
					<div class="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
						<div class="flex flex-row items-center gap-1 p-4">
							<div class="text-2xl font-semibold">
								$ {listing.price}
							</div>
							<div class="font-light text-neutral-600">night</div>
						</div>
						<hr />
						<SveltyPicker
							on:change={({ detail: [startDate, endDate] }) => {
								dateRange[0] = parseISO(startDate);
								dateRange[1] = parseISO(endDate);
							}}
							startDate={new Date()}
							initialDate={dateRange}
							isRange={true}
							mode="date"
							pickerOnly={true}
							disableDatesFn={(date) => {
								return !isDateOutsideReservations(date, reservations);
							}}
						/>
						<hr />
						<div class="p-4">
							<Button disabled={isloading} label="Reserve" onClick={onCreateReservation} />
						</div>
						<hr />
						<div class="flex flex-row items-center justify-between p-4 text-lg font-semibold">
							<div>Total</div>
							<div>
								$ {totalPrice}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</Container>
