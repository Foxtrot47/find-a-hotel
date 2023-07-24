import type { LayoutServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: LayoutServerLoad = async (event) => {
	const session = await event.locals.getSession();
	if (!session || !session.user || !session.user.email) return { session, currentUser: null };
	const currentUser = await prisma.user.findUnique({
		where: {
			email: session.user.email
		}
	});
	return {
		session,
		currentUser
	};
};
