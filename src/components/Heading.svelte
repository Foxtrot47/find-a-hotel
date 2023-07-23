<script>
	export let title = '';
	export let subTitle = '';
	export let center = false;
</script>

<svelte>
	<div class={center ? 'text-center' : 'text-start'}>
		<div class="text-2xl font-bold">
			{title}
		</div>
		<div class="mt-2 font-light text-neutral-500">
			{subTitle}
		</div>
	</div>
</svelte>
