<script lang="ts">
	import { goto } from '$app/navigation';
	import Fa from 'svelte-fa';
	import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { writable } from 'svelte/store';
	import { toasts, ToastContainer, FlatToast } from 'svelte-toasts';
	import { signIn } from '@auth/sveltekit/client';

	import Modal from './Modal.svelte';
	import Heading from '../Heading.svelte';
	import Input from '../Inputs/Input.svelte';
	import { LoginModalOpened, RegisterModalOpened } from '../../stores/index';
	import Button from '../Button.svelte';

	let isLoading = false;

	function LoginClosed() {
		LoginModalOpened.set(false);
	}
	const { form, errors, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().min(8, 'Password is too short - should be 8 chars minimum.')
		}),
		onSubmit: async (data) => {
			isLoading = true;

			const response = await signIn('credentials', {
				...data,
				redirect: false
			});
			const result = await response?.json();
			isLoading = false;

			// Wierd way to check auth status 
			// because auth.js is piece of shit and doesn't 
			// respond properly
			const regex = /\/auth\/error/;
			if (regex.test(result.url)) {
				toasts.add({
					title: 'Error',
					description: 'Invalid credentials',
					type: 'error',
					duration: 5000
				});
			} else {
				toasts.add({
					title: 'Success',
					description: 'Logged in successfully',
					type: 'success',
					duration: 5000
				});
				LoginClosed();
				goto('/');
			}

		}
	});
</script>

<svelte>
	<form on:submit={handleSubmit}>
		<Modal
			actionLabel="Continue"
			disabled={isLoading}
			isOpen={$LoginModalOpened}
			onClose={LoginClosed}
			onSubmit={handleSubmit}
			title="Login"
		>
			<div class="flex flex-col gap-4" slot="body">
				<Heading title="Welcome back" subTitle="Login to your account!" />
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
				<Button outline label="Continue with Google" icon={faGoogle} onClick={LoginClosed} />
				<Button outline label="Continue with Github" icon={faGithub} onClick={LoginClosed} />
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

<svelte>
	<form on:submit={handleSubmit}>
		<Modal
			actionLabel="Continue"
			disabled={isLoading}
			isOpen={$LoginModalOpened}
			onClose={LoginClosed}
			onSubmit={handleSubmit}
			title="Login"
		>
			<div class="flex flex-col gap-4" slot="body">
				<Heading title="Welcome back" subTitle="Login to your account!" />
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
				<Button outline label="Continue with Google" icon={faGoogle} onClick={LoginClosed} />
				<Button outline label="Continue with Github" icon={faGithub} onClick={LoginClosed} />
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
