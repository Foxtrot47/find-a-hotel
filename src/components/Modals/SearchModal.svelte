<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { writable } from 'svelte/store';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { signIn } from '@auth/sveltekit/client';
	import { parseISO } from 'date-fns';

	import Modal from './Modal.svelte';
	import Heading from '$components/Heading.svelte';
	import Input from '$components/Inputs/Input.svelte';
	import { SearchModalOpened } from '../../stores/index';
	import Button from '$components/Button.svelte';
	import Map from '$components/Map.svelte';
	import Counter from '$components/Inputs/Counter.svelte';
	import SveltyPicker from 'svelty-picker';
	import CountrySelect from '$components/Inputs/CountrySelect.svelte';

	export let queryParams: Record<string, string> = {};

	$: isLoading = false;
	$: currenStep = STEPS.LOCATION;
	$: dateRange = [new Date(), new Date()];

	function SearchClosed() {
		currenStep = STEPS.LOCATION;
		SearchModalOpened.set(false);
	}

	const { form, handleSubmit } = createForm({
		initialValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			price: 1
		},
		onSubmit: async (data) => {
			if (currenStep != STEPS.INFO) {
				return onNext();
			}
			let currentQuery = {};
			
			if (queryParams)  {
				currentQuery = queryParams;
			}
			const updatedQuery = {
				...currentQuery,
				guestCount: $form.guestCount,
				locationValue: $form.location,
				roomCount: $form.roomCount,
				bathroomCount: $form.bathroomCount
			};

			if (dateRange[0] && dateRange[1]) {
				updatedQuery.startDate = dateRange[0].toISOString();
				updatedQuery.endDate = dateRange[1].toISOString();
			}
			const newParams = new URLSearchParams(updatedQuery);
			const queryString = newParams.toString();
			await goto(`/?${queryString}`, { replaceState: true });
			currenStep = STEPS.LOCATION;
		}
	});

	const onBack = () => {
		currenStep -= 1;
	};
	const onNext = () => {
		currenStep += 1;
	};

	enum STEPS {
		LOCATION = 0,
		DATE = 1,
		INFO = 2
	}
</script>

<form on:submit={handleSubmit}>
	<Modal
		title="Filters"
		isOpen={$SearchModalOpened}
		actionLabel={currenStep === STEPS.INFO ? 'Search' : 'Next'}
		onClose={SearchClosed}
		onSubmit={handleSubmit}
		secondaryAction={currenStep === STEPS.LOCATION ? undefined : onBack}
		secondaryActionLabel={currenStep === STEPS.LOCATION ? '' : 'Back'}
	>
		<div slot="body">
			{#if currenStep === STEPS.DATE}
				<div class="flex flex-col gap-8">
					<Heading title="When do you plan to go?" subTitle="Make sure everyone is free!" />
					<SveltyPicker
						on:change={({ detail: [startDate, endDate] }) => {
							dateRange[0] = parseISO(startDate);
							dateRange[1] = parseISO(endDate);
						}}
						initialDate={dateRange}
						isRange={true}
						mode="date"
						pickerOnly={true}
					/>
				</div>
			{:else if currenStep === STEPS.INFO}
				<div class="flex flex-col gap-8">
					<Heading title="More information" subTitle="Find your perfect place!" />
					<Counter
						title="Guests"
						subTitle="How many guests do you allow?"
						bind:value={$form.guestCount}
					/>
					<Counter
						title="Rooms"
						subTitle="How many rooms do you have?"
						bind:value={$form.roomCount}
					/>
					<Counter
						title="Bathrooms"
						subTitle="How many bathrooms do you have?"
						bind:value={$form.bathroomCount}
					/>
				</div>
			{:else}
				<div class="flex flex-col gap-8">
					<Heading title="Where do you wanna go?" subTitle="Find the perfect location!" />
					<CountrySelect bind:value={$form.location} />
					<hr />
					{#if $form.location}
						<Map center={$form.location.latlng} />
					{/if}
				</div>
			{/if}
		</div>
	</Modal>
</form>
