<script lang="ts">
	import Fa from 'svelte-fa';
	import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
	import Modal from './Modal.svelte';
	import Heading from '../Heading.svelte';
	import Input from '../Inputs/Input.svelte';
	import { ModalOpened } from '../../stores/RegisterModal';
	import Button from '../Button.svelte';

	let isLoading = false;

	function RegisterClosed() {
		ModalOpened.set(false);
	}
	function onSubmit() {
		return;
	}
</script>

<svelte>
	<Modal
		actionLabel="Continue"
		disabled={isLoading}
		isOpen={$ModalOpened}
		onClose={RegisterClosed}
		{onSubmit}
		title="Register"
	>
		<div class="flex flex-col gap-4" slot="body">
			<Heading title="Welcome to Airbnb" subTitle="Create an account!" />
			<Input id="email" label="Email" disabled={isLoading} type="email" />
			<Input id="name" label="Name" disabled={isLoading} />
			<Input id="password" label="Password" disabled={isLoading} type="password" />
		</div>
		<div class="mt-3 flex flex-col gap-4" slot="footer">
			<hr />
			<Button outline label="Continue with Google" icon={faGoogle} onClick={() => {}} />
			<Button outline label="Continue with Github" icon={faGithub} onClick={() => {}} />
			<div class="mt-4 text-center font-light text-neutral-500">
				<div class="flex flex-row items-center justify-center gap-2">
					<div>Already have an account?</div>
					<div class="cursor-pointer text-neutral-800 hover:underline">Log in</div>
				</div>
			</div>
		</div>
	</Modal>
</svelte>
