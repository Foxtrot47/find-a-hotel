import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async ({locals, url }) => {
	const session = await locals.getSession();
	if (!session || !session.user || !session.user.email) return { session, currentUser: null };
	const currentUser = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	});

	const params = [];

	for (const [key, value] of url.searchParams.entries()) {
		params.push({ key, value });
	}

	return {
		session,
		currentUser,
		params
	};
};
