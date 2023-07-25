<script lang="ts">
	import type { User } from '@prisma/client';

	import Container from '../Container.svelte';
	import Logo from './Logo.svelte';
	import Search from './Search.svelte';
	import UserMenu from './UserMenu.svelte';
	import Categories from './Categories.svelte';

	export let currentUser: User | null = null;
</script>

<svelte>
	<div class="fixed z-10 w-full bg-white shadow-sm">
		<div class="border-b-[1px] py-4">
			<Container>
				<div class="flex flex-row items-center justify-between gap-3 md:gap-0">
					<Logo />
					<Search />
					<UserMenu {currentUser} />
				</div>
			</Container>
		</div>
		<Categories />
	</div>
</svelte>
