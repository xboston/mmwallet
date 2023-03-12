import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { getWalletsInitStatus } from '$lib/server/statuses';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (event) => {
    return json({
        result: await getWalletsInitStatus(),
        updatedOn: new Date(),
    });
};
