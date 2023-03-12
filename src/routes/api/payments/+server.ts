import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { getPaymentsStatus } from '$lib/server/statuses';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (event) => {
    return json({
        result: await getPaymentsStatus(),
        updatedOn: new Date(),
    });
};
