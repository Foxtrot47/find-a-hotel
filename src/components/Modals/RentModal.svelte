<script lang="ts">
	import { goto } from '$app/navigation';
	import Icon from '@iconify/svelte';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { writable } from 'svelte/store';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { signIn } from '@auth/sveltekit/client';

	import Modal from './Modal.svelte';
	import Heading from '../Heading.svelte';
	import Input from '../Inputs/Input.svelte';
	import { RentModalOpened } from '../../stores/index';
	import Button from '../Button.svelte';
	import RegisterModal from './RegisterModal.svelte';
	import { categoriesList } from "../Navbar/Categories";
	import type { Category } from "../Navbar/Categories";
	import CategoryInput from '../Inputs/CategoryInput.svelte';

	let isLoading = false;
	let selectedCategory: string;

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
	const { form, errors, handleSubmit } = createForm({
		initialValues: {
			category: "",
			location: null,
			guestCount: 1,
			roomCount: 1,
			bathroomCount: 1,
			imageSrc: "",
			price: 1,
			title: "",
			description: ""
		},
		onSubmit: async (data) => {}
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

<svelte>
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
			<div class="flex flex-col gap-8" slot="body">
				<Heading title="Which of these best describes your place?" subTitle="Pick a category" />
				<div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
					{#each categoriesList as category}
						<div class="col-span-1">
							<CategoryInput 
								onClick={(category) => {selectedCategory = category}}
								selected={selectedCategory === category.label}
								label={category.label}
								icon={category.icon}
							/>
						</div>
					{/each}
				</div>
			</div>
		</Modal>
	</form>
</svelte>
