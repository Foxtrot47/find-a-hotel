<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { writable } from 'svelte/store';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { signIn } from '@auth/sveltekit/client';

	import Modal from './Modal.svelte';
	import Heading from '$components/Heading.svelte';
	import Input from '$components/Inputs/Input.svelte';
	import { RentModalOpened } from '../../stores/index';
	import Button from '$components/Button.svelte';
	import RegisterModal from './RegisterModal.svelte';
	import { categoriesList } from '$components/Navbar/Categories';
	import type { Category } from '$components/Navbar/Categories';
	import CategoryInput from '$components/Inputs/CategoryInput.svelte';
	import CountrySelect from '$components/Inputs/CountrySelect.svelte';
	import type { CountrySelectValue } from '$components/Inputs/Countries';
	import Map from '$components/Map.svelte';
	import Counter from '$components/Inputs/Counter.svelte';
	import ImageUpload from '$components/Inputs/ImageUpload.svelte';

	let isLoading = false;

	enum STEPS {
		CATEGORY = 0,
		LOCATION = 1,
		INFO = 2,
		IMAGES = 3,
		DESCRIPTION = 4,
		PRICE = 5
	}
	$: currenStep = STEPS.CATEGORY;

	function RentModalClosed() {
		RentModalOpened.set(false);
	}
	const { form, errors, handleReset, handleSubmit } = createForm({
		initialValues: {
			category: '',
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: '',
			price: 1,
			title: '',
			description: ''
		},
		onSubmit: async (data) => {
			if (currenStep !== STEPS.PRICE) {
				return onNext();
			}
			isLoading = true;

			const response = await fetch('/api/listing', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			if (response.ok) {
				toasts.add({
					title: 'Listing created!',
					description: 'Listing Created!',
					type: 'success'
				});
				handleReset();
				RentModalOpened.set(false);
				await invalidateAll();
			} else {
				toasts.add({
					title: 'Error!',
					description: 'Something went wrong!',
					type: 'error'
				});
			}
			isLoading = false;
		}
	});
	const openRegisterModal = () => {
		RentModalOpened.set(false);
	};
	const onBack = () => {
		currenStep -= 1;
	};
	const onNext = () => {
		currenStep += 1;
	};
	$: actionLabel = currenStep === STEPS.PRICE ? 'Create' : 'Next';
	$: secondaryActionLabel = currenStep === STEPS.CATEGORY ? undefined : 'Back';
</script>

<form on:submit={handleSubmit}>
	<Modal
		{actionLabel}
		disabled={isLoading}
		isOpen={$RentModalOpened}
		onClose={RentModalClosed}
		onSubmit={handleSubmit}
		{secondaryActionLabel}
		secondaryAction={currenStep === STEPS.CATEGORY ? undefined : onBack}
		title="Airbnb your home!"
	>
		<div slot="body">
			{#if currenStep === STEPS.CATEGORY}
				<div class="flex flex-col gap-8">
					<Heading title="Which of these best describes your place?" subTitle="Pick a category" />
					<div class="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto pr-2 md:grid-cols-2">
						{#each categoriesList as category}
							<div class="col-span-1">
								<CategoryInput
									onClick={(category) => {
										$form.category = category;
									}}
									selected={$form.category === category.label}
									label={category.label}
									icon={category.icon}
								/>
							</div>
						{/each}
					</div>
				</div>
			{:else if currenStep === STEPS.LOCATION}
				<div class="flex flex-col gap-8">
					<Heading title="Where's your place located?" subTitle="Help guests find you!" />
					<CountrySelect bind:value={$form.location} />
					{#if $form.location}
						<Map center={$form.location.latlng} />
					{/if}
				</div>
			{:else if currenStep === STEPS.INFO}
				<div class="flex flex-col gap-8">
					<Heading
						title="Share some basics about your place"
						subTitle="What amenities do you have?"
					/>
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
			{:else if currenStep == STEPS.IMAGES}
				<div class="flex flex-col gap-8">
					<Heading
						title="Add a photo of your place"
						subTitle="Show guests what your place looks like!"
					/>
					<ImageUpload bind:imageUrl={$form.imageSrc} />
				</div>
			{:else if currenStep == STEPS.DESCRIPTION}
				<div class="flex flex-col gap-8">
					<Heading
						title="How would you descibe your place?"
						subTitle="Short and sweet works best!"
					/>

					<Input
						id="title"
						label="Title"
						disabled={isLoading}
						required
						bind:value={$form.title}
						error={$errors.title}
					/>
					<hr />

					<Input
						id="description"
						label="Description"
						disabled={isLoading}
						required
						bind:value={$form.description}
						error={$errors.description}
					/>
				</div>
			{:else if currenStep == STEPS.PRICE}
				<div class="flex flex-col gap-8">
					<Heading title="Now, set your price" subTitle="How much do you charge per night?" />
					<Input
						id="price"
						label="price"
						formatPrice={true}
						type="number"
						disabled={isLoading}
						required
						bind:value={$form.price}
					/>
				</div>
			{/if}
		</div>
	</Modal>
</form>
