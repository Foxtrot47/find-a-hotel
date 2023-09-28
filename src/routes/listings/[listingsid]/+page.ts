import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const listingsid = params.listingsid;
	const listingsRes = await fetch(`/api/listings?listingid=${listingsid}`);
	const listings = await listingsRes.json();
	if (!listingsRes.ok) {
		location.href = '/404';
		return {
			listings: null,
			error: true
		};
	}

	const reservationsRes = await fetch(`/api/reservations?listingId=${listingsid}`);
	const reservations = await reservationsRes.json();
	if (!reservationsRes.ok) {
		location.href = '/404';
		return {
			listings: null,
			reservations: null,
			error: true
		};
	}

	return {
		listings,
		reservations,
		error: false
	};
};
