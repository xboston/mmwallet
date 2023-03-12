import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { getSolanaStatus } from '$lib/server/apis';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (event) => {
    return json({
        result: await getSolanaStatus(),
        updatedOn: new Date(),
    });
};
