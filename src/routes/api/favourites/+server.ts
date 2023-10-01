import type {  RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ locals}) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}
	const currentUser = prisma.user.findFirst({
		where: {
			email: session?.user?.email
		}
	});
	if (!currentUser) {
		throw error(401, 'Unauthorized');
	}
	const userData = await currentUser;
	if (userData == undefined) {
		throw error(401, 'user credentials missing');
	}
	if (userData.favouriteIds.length <= 0) {
		return json([]);
	}
	const favourites = await prisma.listing.findMany({
        where: {
            id: {
              in: [...(userData.favouriteIds)]
            }
          }
	});
	return json(favourites);
};