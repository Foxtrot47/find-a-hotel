import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ fetch, parent }) => {
	try {
		const { currentUser } = await parent();
		if (!currentUser) {
			return {
				currentUser: null,
				listings: null,
				error: true
			};
		}

		const listingsRes = await fetch(`/api/listings?userId=${currentUser.id}`);
		if (!listingsRes.ok) {
			return {
				currentUser,
				listings: null,
				error: true
			};
		}

		const listings = await listingsRes.json();
		return {
			currentUser,
			listings,
			error: false
		};
	} catch (e) {
		goto('/');
		return {
			listings: null,
			error: true
		};
	}
};
