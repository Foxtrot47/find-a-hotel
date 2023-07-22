<script lang="ts">
	import Fa from 'svelte-fa';
	import { faClose } from '@fortawesome/free-solid-svg-icons';
	import Button from '../Button.svelte';

	export let isOpen = false;
	export let onClose = () => {};
	export let onSubmit = () => {};
	export let title = '';
	export let actionLabel = '';
	export let disabled = false;
	export let secondaryAction = () => {};
	export let secondaryActionLabel = '';

	let showModal: boolean;
	$:{
		// Add a tiny delay to make the opening animation work properly
		setTimeout(() => {
			showModal = isOpen
		}, 0);
	};

	const handleClose = () => {
		if (disabled) return;
		showModal = false;
		setTimeout(() => {
			onClose();
		}, 300);
	};
	const handleSubmit = () => {
		if (disabled) return;
		onSubmit();
	};
	const handleSecondaryAction = () => {
		if (disabled || !secondaryAction) return;
		secondaryAction();
	};

	showModal = isOpen;
</script>

{#if isOpen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none focus:outline-none"
	>
		<div class="relative mx-auto my-6 h-full w-full md:h-auto md:w-4/6 lg:h-auto lg:w-3/6 xl:w-2/5">
			<!-- Content -->
			<div
				class={`translate h-full duration-300 
					${showModal ? 'translate-y-0' : 'translate-y-full'}
					${showModal ? 'opacity-100' : 'opacity-0'}
                `}
			>
				<div
					class="translate relative flex h-full w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none md:h-auto lg:h-auto"
				>
					<!-- Header -->
					<div class="relative flex items-center justify-center rounded-t border-b-[1px] p-6">
						<button
							class="absolute left-9 border-0 p-1 transition hover:opacity-70"
							on:click={handleClose}
						>
							<Fa icon={faClose} />
						</button>
						<div class="text-lg font-semibold">{title}</div>
					</div>
					<!-- Body -->
					<div class="relative flex-auto p-6">
						<slot title="body" />
					</div>
					<!-- Footer -->
					<div class="flex flex-col gap-2 p-6">
						<div class="w-full flex-row items-center gap-4">
							{#if secondaryActionLabel}
								<Button
									{disabled}
									label={secondaryActionLabel}
									outline
									onClick={handleSecondaryAction}
								/>
							{/if}
							<Button {disabled} label={actionLabel} onClick={handleSubmit} />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}