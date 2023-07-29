<script lang="ts">
	import Icon from '@iconify/svelte';

	export let id = '';
	export let label: string | undefined = undefined;
	export let type = 'text';
	export let disabled = false;
	export let formatPrice = false;
	export let required = false;
	export let value: string | number;
	export let error = '';

	let internalValue = value;
	
	const handleInput = (e: Event) => {
		internalValue = (e.target as HTMLInputElement).value;
		value = internalValue;
	};
</script>

<div class="relative w-full">
	{#if formatPrice}
		<Icon class="absolute left-2 top-5 text-neutral-700" icon="mdi:dollar" />
	{/if}

	<input
		{value}
		class={`
                rounded-mf peer w-full border-2 bg-white p-4 pt-6 font-light outline-none transition disabled:cursor-not-allowed disabled:opacity-70
                ${formatPrice ? 'pl-9' : 'pl-4'}
				${error !== '' ? 'border-rose-500' : 'border-neutral-300'}
          		${error !== '' ? 'focus:border-rose-500' : 'focus:border-black'}
            `}
		{disabled}
		{id}
		name={id}
		placeholder=" "
		{required}
		{type}
		on:change={handleInput}
		on:input={handleInput}
	/>
	<label
		for={id}
		class={`
            text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150
            ${formatPrice ? 'left-9' : 'left-4'}
            peer-placeholder-show:scale-100
            peer-placeholder-shown:translate-y-0p
            peer-focus:-translate-y-4
            peer-focus:scale-75
			${error !== '' ? 'text-rose-500' : 'text-zinc-400'}
            `}
	>
		{#if label}{label}{/if}
	</label>
</div>
