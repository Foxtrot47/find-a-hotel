import bcrypt from 'bcrypt';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '$lib/prisma';

interface User {
	name: string;
	email: string;
	password: string;
}

export const POST = (async ({ request }) => {
	if (request.body == null) {
		throw error(400, 'Bad Request');
	}
	const { name, email, password }: User = await request.json();

	const hashedPassword = await bcrypt.hash(password, 12);

	const user = await prisma.user.create({
		data: {
			name: name,
			email: email,
			hashedPassword
		}
	});

	return json(user);
}) satisfies RequestHandler;
