import type { PageLoad } from './$types';
import { goto } from '$app/navigation';
import { toasts } from 'svelte-toasts';

export const load: PageLoad = async ({ fetch, parent }) => {
    try {
        
    const { currentUser } = await parent();
    if (!currentUser) {
        return {
            reservations: null,
            error: true
        }
    }
        
	const reservationsRes = await fetch(`/api/reservations?authorId=${currentUser.id}`);
	const reservations = await reservationsRes.json();
	if (!reservationsRes.ok) {
        toasts.add({
            title: 'Error',
            description: 'Failed to load reservations.',
            type: 'error',
            duration: 5000
        });
        throw new Error("Failed to load reservations");
	}

	return {
		reservations,
		error: false
	};
    }
    catch (e) {
        goto("/");
        return {
            reservations: null,
            error: true
        };
    }
};
