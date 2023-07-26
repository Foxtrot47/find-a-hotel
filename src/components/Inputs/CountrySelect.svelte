<script lang="ts">
	import { countriesList, getByValue } from './Countries';
	import Select from 'svelte-select';
	import type { CountrySelectValue } from './Countries';

	export let value: CountrySelectValue | null;
</script>

<svelte>
	<div>
		<Select
			items={countriesList}
			showChevron={true}
			bind:value
			placeholder="Anywhere"
			class="py-3"
			containerStyles="padding-top: 0.75rem; padding-bottom: 0.75rem; display: flex;  align-items: center; justify-content: center;"
		>
			<div slot="selection" let:selection>
				<div class="flex flex-row items-center gap-3 align-middle">
					<div>{selection.flag}</div>
					<div class="text-lg">
						{selection.label},
						<span class="ml-1 text-neutral-500">{selection.region}</span>
					</div>
				</div>
			</div>
			<div slot="item" let:item>
				<div class="flex flex-row items-center gap-3 align-middle">
					<div>{item.flag}</div>
					<div class="text-lg">
						{item.label},
						<span class="ml-1 text-neutral-500">{item.region}</span>
					</div>
				</div>
			</div>
		</Select>
	</div>
</svelte>
