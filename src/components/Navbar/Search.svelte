<script>
	import Fa from 'svelte-fa';
	import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
</script>

<svelte>
	<div
		class="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto"
	>
		<div class="flex flex-row items-center justify-between">
			<div class="px-6 text-sm font-semibold">Anywhere</div>
			<div class="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">
				Any Week
			</div>
			<div class="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
				<div class="hidden sm:block">Add Guests</div>
				<div class="rounded-full bg-rose-500 p-2 text-white">
                    <Fa icon={faMagnifyingGlass} />
                </div>
			</div>
		</div>
	</div>
</svelte>
