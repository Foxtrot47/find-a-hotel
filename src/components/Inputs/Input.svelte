<script lang="ts">
	import Fa from 'svelte-fa';
	import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

	export let id = '';
	export let label = '';
	export let type = 'text';
	export let disabled = false;
	export let formatPrice = false;
	export let required = false;
</script>

<svelte>
	<div class="relative w-full">
		{#if formatPrice}
			<Fa class="absolute left-2 top-5 text-neutral-700" icon={faDollarSign} />
		{/if}

		<input
			{id}
			{disabled}
			placeholder=" "
			{type}
			class={`
                rounded-mf peer w-full border-2 border-neutral-300 bg-white p-4 pt-6 font-light outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-70
                ${formatPrice ? 'pl-9' : 'pl-4'}
            `}
		/>
		<label
			for={id}
			class={`
            text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150
            ${formatPrice ? 'left-9' : 'left-4'}
            peer-placeholder-show:scale-100
            peer-placeholder-shown:translate-y-0p
            text-zinc-400
            peer-focus:-translate-y-4
            peer-focus:scale-75
            `}>{label}</label
		>
	</div>
</svelte>
