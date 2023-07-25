<script lang="ts">
	import Icon from '@iconify/svelte';

	export let icon: string;
	export let label: string;
	export let selected = false;
	export let onClick: (value: string) => void;
</script>

<svelte>
	<button
		class={`flex w-full cursor-pointer flex-col items-start gap-3 rounded-xl border-2 p-4 transition hover:border-black
        ${selected ? 'border-black' : 'border-neutral-200'}
        `}
		on:click={() => onClick(label)}
	>
		<Icon {icon} />
		<div class="font-semibold">{label}</div>
	</button>
</svelte>
