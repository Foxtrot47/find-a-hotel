import { json, error } from '@sveltejs/kit';
import type { RequestEvent, RequestHandler } from './$types';
import prisma from '$lib/prisma';

export const GET: RequestHandler = async ({ url, locals }) => {
	const listingId = url.searchParams.get('listingId');
	const authorId = url.searchParams.get('authorId');
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}

	const query: {
		listingId?: string;
		userId?: string;
		listing?: {
			userId: string;
		};
	} = {};

	if (listingId) {
		query.listingId = listingId;
	}
	if (authorId) {
		query.listing = { userId: authorId };
	}
	else {
		query.userId = session.id;
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

export const DELETE: RequestHandler = async ({ locals, url }) => {
	const session = await locals.getSession();

	if (!session?.user?.email) {
		throw error(401, 'Unauthorized');
	}
	const reservationId  = url.searchParams.get('reservationId');

	if (!reservationId  || typeof reservationId  !== 'string') {
		throw new Error('Invalid ID');
	  }

	  const reservations = await prisma.reservation.deleteMany({
		where: {
		  id: reservationId,
		  OR: [
			{ userId: session.id },
			{ listing: { userId: session.id } }
		  ]
		}
	  });

	if (!reservations) {
		throw error(404, 'Not Found');
	}
	return json(reservations);
};