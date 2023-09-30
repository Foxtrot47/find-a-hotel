import { goto } from '$app/navigation';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { currentUser } = await parent();

    if (!currentUser || currentUser == null) {
        goto("/");
    }

    const reservationsFetch = await fetch(`/api/reservations?userId: ${currentUser.id}`);
    const reservations = await reservationsFetch.json();

	return { currentUser, reservations};
};