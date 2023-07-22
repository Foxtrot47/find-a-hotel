<script lang="ts">
	export let onClick: () => void;
	export let label: string;
</script>

<svelte>
	<div
		on:click={onClick}
		on:keydown={(e) => e.key === 'Enter' && onClick}
		class="py-3 px-4 font-semibold transition hover:bg-neutral-100"
		role="button"
		tabindex="0"
	>
		{label}
	</div>
</svelte>
