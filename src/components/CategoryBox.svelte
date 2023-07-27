<script lang="ts">
	import { page } from '$app/stores';
	import Icon from '@iconify/svelte';

	export let icon: string;
	export let label: string;
	export let selected: boolean = false;

	const handleClick = () => {
		if ($page?.url?.searchParams === null) return;

		const url = new URL($page.url.href);

		if (url.searchParams.get('category') === label) {
			url.searchParams.delete('category');
		} else {
			url.searchParams.set('category', label);
		}

		location.href = url.href;
	};
</script>

<div
	on:click={handleClick}
	on:keydown={(e) => e.key === 'Enter' && handleClick()}
	role="button"
	tabindex="0"
	class={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    `}
>
	<Icon {icon} />
	<div class="text-sm font-medium">{label}</div>
</div>
