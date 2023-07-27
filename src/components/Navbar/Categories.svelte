<script lang="ts">
	import { page } from '$app/stores';
	import CategoryBox from '../CategoryBox.svelte';
	import { categoriesList } from './Categories';

	$: currentCategory = $page.url.searchParams.get('category');
	$: isMainPage = $page.url.pathname === '/';
</script>

{#if isMainPage}
	<div class="flex flex-row items-center justify-between overflow-x-auto px-3 pt-4">
		{#each categoriesList as category}
			<CategoryBox
				icon={category.icon}
				label={category.label}
				selected={currentCategory === category.label}
			/>
		{/each}
	</div>
{/if}
