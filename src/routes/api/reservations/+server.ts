import { json, error } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url }) => {
	const listingId = url.searchParams.get('listingId');
	const userId = url.searchParams.get('userId');
	const authorId = url.searchParams.get('authorId');

	const query: any = {};

	if (listingId) {
		query.listingId = listingId;
	}
	if (userId) {
		query.userId = userId;
	}
	if (authorId) {
		query.authorId = authorId;
	}
	const reservations = await prisma.reservation.findMany({
		where: query,
		include: {
			listing: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});

	if (!reservations) {
		throw error(404, 'Not Found');
	}
	return json(reservations);
};

export const POST: RequestHandler = async (event: RequestEvent) => {
	const session = await event.locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}
	const body = await event.request.json();
	const { listingId, startDate, endDate, totalPrice } = body;

	if (!listingId || !startDate || !endDate || !totalPrice) {
		throw error(400, 'Bad Request');
	}

	const listingAndReservation = await prisma.listing.update({
		where: {
			id: listingId
		},
		data: {
			reservations: {
				create: {
					userId: session?.id,
					startDate,
					endDate,
					totalPrice
				}
			}
		}
	});

	return json(listingAndReservation);
};
