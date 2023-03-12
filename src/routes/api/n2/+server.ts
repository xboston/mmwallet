import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import { getPaymentsStatus } from '$lib/server/statuses';
import { getN2ApiStatus, getSolanaStatus } from '$lib/server/apis';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (event) => {
    return json({
        result: await getN2ApiStatus(),
        updatedOn: new Date(),
    });
};
