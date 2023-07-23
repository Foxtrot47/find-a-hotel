<script lang="ts">
	import Fa from 'svelte-fa';
	import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
	export let label: string;
	export let onClick: () => void;
	export let disabled = false;
	export let outline = false;
	export let small = false;
	export let icon: IconDefinition | null = null;
</script>

<svelte>
	<button
		{disabled}
		on:click={onClick}
		class={`relative flex w-full justify-center rounded-lg transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
            ${outline ? 'bg-white' : 'bg-rose-500'}
            ${outline ? 'border-black' : 'border-rose-500'}
            ${outline ? 'text-black' : 'text-white'}
            ${small ? 'text-sm' : 'text-md'}
            ${small ? 'py-1' : 'py-3'}
            ${small ? 'font-light' : 'font-semibold'}
            ${small ? 'border-[1px]' : 'border-2'}
        `}
	>
		{#if icon}
			<Fa class="absolute left-4 self-center" {icon} />
		{/if}
		{label}
	</button>
</svelte>
