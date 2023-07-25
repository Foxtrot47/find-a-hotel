<script lang="ts">
	import { page } from '$app/stores';
	import CategoryBox from '../CategoryBox.svelte';

	export const categories = [
		{
			label: 'Beach',
			icon: 'tabler:beach',
			descrition: 'This property is close to the beach!'
		},
		{
			label: 'Windmills',
			icon: 'game-icons:windmill',
			description: 'This property is close to the windmills!'
		},
		{
			label: 'Modern',
			icon: 'material-symbols:villa-outline',
			description: 'This property is modern!'
		},
		{
			label: 'Countryside',
			icon: 'tabler:mountain',
			description: 'This property is in the countryside!'
		},
		{
			label: 'Pools',
			icon: 'tabler:pool',
			description: 'This property has a pool!'
		},
		{
			label: 'Islands',
			icon: 'game-icons:island',
			description: 'This property is on an island!'
		},
		{
			label: 'Lake',
			icon: 'game-icons:boat-fishing',
			description: 'This property is close to a lake!'
		},
		{
			label: 'Skiing',
			icon: 'fa-solid:skiing',
			description: 'This property has skiing activities!'
		},
		{
			label: 'Castles',
			icon: 'material-symbols:castle',
			description: 'This property is in a castle'
		},
		{
			label: 'Camping',
			icon: 'game-icons:forest-camp',
			description: 'This property has camping activities'
		},
		{
			label: 'Arctic',
			icon: 'bi:snow',
			description: 'This property has camping activities'
		},
		{
			label: 'Cave',
			icon: 'game-icons:cave-entrance',
			description: 'This property is in a cave'
		},
		{
			label: 'Desert',
			icon: 'game-icons:cactus',
			description: 'This property is in the desert'
		},
		{
			label: 'Barns',
			icon: 'game-icons:barn',
			description: 'This property is in the barn'
		},
		{
			label: 'Lux',
			icon: 'ion:diamond',
			description: 'This property is luxurious'
		}
	];

	$: currentCategory = $page.url.searchParams.get('category');
	$: isMainPage = $page.url.pathname === '/';
</script>

<svelte>
	{#if isMainPage}
		<div class="flex flex-row items-center justify-between overflow-x-auto pt-4 px-3">
			{#each categories as category}
				<CategoryBox
					icon={category.icon}
					label={category.label}
					selected={currentCategory === category.label}
				/>
			{/each}
		</div>
	{/if}
</svelte>
