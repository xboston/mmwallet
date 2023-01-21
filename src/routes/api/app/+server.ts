import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async ({ fetch, request }) => {
    return json({ hey: 'ya!', to: typeof request, ft: typeof fetch });
};
