<script lang="ts">
	import type { User } from '@prisma/client';

	import Container from '../Container.svelte';
	import Search from './Search.svelte';
	import UserMenu from './UserMenu.svelte';
	import Categories from './Categories.svelte';

	export let currentUser: User | null = null;
</script>

<div class="fixed z-10 w-full bg-white shadow-sm">
	<div class="border-b-[1px] py-4">
		<Container>
			<div class="flex flex-row items-center justify-between gap-3 md:gap-0">
				<a href="/">
					<img
						alt="logo"
						class="hidden cursor-pointer md:block"
						height="100"
						width="100"
						src="/logo.png"
					/>
				</a>
				<Search />
				<UserMenu {currentUser} />
			</div>
		</Container>
	</div>
	<Categories />
</div>
