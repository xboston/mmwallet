import { json } from '@sveltejs/kit';

import { getSolanaStatus } from '$lib/server/apis';

export const GET = async (event) => {
    return json({
        result: await getSolanaStatus(),
        updatedOn: new Date(),
    });
};
