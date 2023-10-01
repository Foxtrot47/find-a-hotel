import type { PageServerLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageServerLoad = async ({ parent, fetch }) => {
	const { currentUser } = await parent();

    if (!currentUser || currentUser == null) {
		return {
			listings: null,
			error: false
		};
    }
	const listingsRes = await fetch(`/api/favourites`);
	if (!listingsRes.ok) {
		goto("/")
		return {
			listings: null,
			error: true
		};
	}
    const listings = await listingsRes.json();

	return {
		listings,
		error: false
	};
};
