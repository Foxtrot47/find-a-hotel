import type { RequestEvent, RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';
import prisma from '$lib/prisma';

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	const session = await requestEvent.locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}
	const { params } = requestEvent;
	const { listingId } = params;

	if (!listingId || typeof listingId !== 'string') {
		throw error(400, 'listingId required');
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
	if(userData == undefined) {
		throw error(401, 'user credentials missing');
	}
	const favouriteIds = [...(userData.favouriteIds || [])];
	favouriteIds.push(listingId);
	
	const user = await prisma.user.update({
		where: {
			email: session.user.email
		},
		data: {
			favouriteIds: favouriteIds
		}
	});
	return json({ favouriteIds: user.favouriteIds });
};

export const DELETE: RequestHandler = async (requestEvent: RequestEvent) => {
	const session = await requestEvent.locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}
	const { params } = requestEvent;
	const { listingId } = params;

	if (!listingId || typeof listingId !== 'string') {
		throw error(400, 'listingId required');
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
	if(userData == undefined) {
		throw error(401, 'user credentials missing');
	}
	let favouriteIds = [...(userData.favouriteIds || [])];
	favouriteIds = favouriteIds.filter((id) => id !== listingId);

	const user = await prisma.user.update({
		where: {
			email: session.user.email
		},
		data: {
			favouriteIds: favouriteIds
		}
	});
	return json({ favouriteIds: user.favouriteIds });
};
