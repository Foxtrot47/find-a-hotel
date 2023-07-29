<script lang="ts">
	import Icon from '@iconify/svelte';
	export let title: string;
	export let subTitle: string;
	export let value: number;

	const onAdd = () => {
		value += 1;
	};
	const onReduce = () => {
		if (value == 1) return;
		value -= 1;
	};
</script>

<div class="flex flex-row items-center justify-between">
	<div class="flex flex-col">
		<div class="font-medium">{title}</div>
		<div class="font-light text-gray-600">
			{subTitle}
		</div>
	</div>
	<div class="flex flex-row items-center gap-4">
		<button
			type="button"
			on:click={onReduce}
			class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80
        "
		>
			<Icon icon="ant-design:minus-outlined" />
		</button>
		<div
			class="
          text-xl
          font-light
          text-neutral-600
        "
		>
			{value}
		</div>
		<button
			type="button"
			on:click={onAdd}
			class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
		>
			<Icon icon="ant-design:plus-outlined" />
		</button>
	</div>
</div>
