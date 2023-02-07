import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = (event) => {
    return json({
        latests: event.locals.latests,
        updatedOn: event.locals.updatedAt,
    });
};
