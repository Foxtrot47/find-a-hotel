import type { PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load = (async ({url}) => {
	const listings = await prisma.listing.findMany({
		orderBy: {
			createdAt: 'desc'
		}
	});

	return {
		listings
	};
}) satisfies PageServerLoad;
