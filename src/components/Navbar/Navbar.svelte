<script lang="ts">
	import Container from "../Container.svelte";
	import Logo from "./Logo.svelte";
	import Search from './Search.svelte';
</script>

<svelte>
	<div class="fixed z-10 w-full bg-white shadow-sm">
		<div class="border-b-[1px] py-4">
			<Container>
				<div class="flex flex-row items-center justify-between gap-3 md:gap-0">
					<Logo />
					<Search />
				</div>
			</Container>
		</div>
	</div>
</svelte>
