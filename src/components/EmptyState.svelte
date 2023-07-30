<script lang="ts">
	import Button from './Button.svelte';
	import Heading from './Heading.svelte';

	export let title = 'No exact matches';
	export let subTitle = 'Try changing or removing some of your filters.';
	export let showReset = false;
</script>

<div class=" flex h-[60vh] flex-col items-center justify-center gap-2">
	<Heading center {title} {subTitle} />
	<div class="mt-4 w-48">
		{#if showReset}
			<Button outline label="Remove all filters" onClick={() => (location.href = '/')} />
		{/if}
	</div>
</div>
