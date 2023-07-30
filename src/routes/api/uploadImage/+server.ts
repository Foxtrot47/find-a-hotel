import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import cloudinary from '$lib/cloudinary';

export const POST: RequestHandler = async ({ request }) => {
	const { data } = await request.json();

	const uploadStr = 'data:image/jpeg;base64,' + data;

	try {
		const result = await cloudinary.uploader.upload(uploadStr);
		if (!result) {
			return new Response(JSON.stringify({ error: true }));
		}
		return json({ url: result.secure_url });
	} catch (err) {
		console.error(err);
		return new Response(JSON.stringify({ error: true }));
	}
};
