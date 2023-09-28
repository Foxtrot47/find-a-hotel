import { writable } from 'svelte/store';

export const LoginModalOpened = writable(false);
export const RegisterModalOpened = writable(false);
export const RentModalOpened = writable(false);
export const FavouriteIds = writable<string[]>([]);
