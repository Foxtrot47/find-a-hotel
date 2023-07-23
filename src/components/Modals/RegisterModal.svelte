<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { writable } from 'svelte/store';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';

	import Modal from './Modal.svelte';
	import Heading from '../Heading.svelte';
	import Input from '../Inputs/Input.svelte';
	import { ModalOpened } from '../../stores/RegisterModal';
	import Button from '../Button.svelte';

	let isLoading = false;

	function RegisterClosed() {
		ModalOpened.set(false);
	}
	const { form, errors, handleSubmit } = createForm({
		initialValues: {
			name: '',
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			name: yup.string().required(),
			password: yup.string().min(8, 'Password is too short - should be 8 chars minimum.')
		}),
		onSubmit: async (values: { name: string; email: string; password: string }) => {
			try {
				const apiResponse = await fetch('/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(values)
				});
				if (apiResponse.ok === false) {
					throw new Error();
				}
			} catch (e) {
				toasts.add({
					title: 'Error occured',
					description: 'Please try again later',
					duration: 5000,
					placement: 'top-right',
					type: 'error',
					theme: 'dark'
				});
			}
		}
	});
</script>

<svelte>
	<form on:submit={handleSubmit}>
		<Modal
			actionLabel="Continue"
			disabled={isLoading}
			isOpen={$ModalOpened}
			onClose={RegisterClosed}
			onSubmit={handleSubmit}
			title="Register"
		>
			<div class="flex flex-col gap-4" slot="body">
				<Heading title="Welcome to Airbnb" subTitle="Create an account!" />
				<Input
					id="email"
					label="Email"
					disabled={isLoading}
					type="email"
					bind:value={$form.email}
					required={true}
					error={$errors.email}
				/>
				<Input
					id="name"
					label="Name"
					disabled={isLoading}
					bind:value={$form.name}
					required={true}
					error={$errors.name}
				/>
				<Input
					id="password"
					label="Password"
					disabled={isLoading}
					type="password"
					bind:value={$form.password}
					required={true}
					error={$errors.password}
				/>
			</div>
			<div class="mt-3 flex flex-col gap-4" slot="footer">
				<hr />
				<Button outline label="Continue with Google" icon={faGoogle} onClick={RegisterClosed} />
				<Button outline label="Continue with Github" icon={faGithub} onClick={RegisterClosed} />
				<div class="mt-4 text-center font-light text-neutral-500">
					<div class="flex flex-row items-center justify-center gap-2">
						<div>Already have an account?</div>
						<div class="cursor-pointer text-neutral-800 hover:underline">Log in</div>
					</div>
				</div>
			</div>
		</Modal>
	</form>
</svelte>
