<script lang="ts">
	import { page } from '$app/stores';
	import CategoryBox from '../CategoryBox.svelte';
	import { categoriesList } from './Categories';

	$: currentCategory = $page.url.searchParams.get('category');
	$: isMainPage = $page.url.pathname === '/';
</script>

<svelte>
	{#if isMainPage}
		<div class="flex flex-row items-center justify-between overflow-x-auto pt-4 px-3">
			{#each categoriesList as category}
				<CategoryBox
					icon={category.icon}
					label={category.label}
					selected={currentCategory === category.label}
				/>
			{/each}
		</div>
	{/if}
</svelte>
