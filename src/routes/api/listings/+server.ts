import prisma from '$lib/prisma';
import type { RequestEvent, RequestHandler } from './$types';
import { error, json } from '@sveltejs/kit';

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	const session = await requestEvent.locals.getSession();

	if (!session?.user && !session?.id) {
		throw error(401, 'Unauthorized');
	}
	const body = await requestEvent.request.json();
	const {
		title,
		description,
		imageSrc,
		category,
		roomCount,
		bathroomCount,
		guestCount,
		location,
		price
	} = body;

	Object.keys(body).forEach((value: any) => {
		if (!body[value]) {
			throw error(400, 'Bad Request');
		}
	});

	const listing = await prisma.listing.create({
		data: {
			title,
			description,
			imageSrc,
			category,
			roomCount,
			bathroomCount,
			guestCount,
			locationValue: location.value,
			price: parseInt(price),
			userId: session.id
		}
	});

	return json(listing);
};
