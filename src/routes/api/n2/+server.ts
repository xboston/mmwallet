import { json } from '@sveltejs/kit';

import { getPaymentsStatus } from '$lib/server/statuses';
import { getN2ApiStatus, getSolanaStatus } from '$lib/server/apis';

export const GET = async (event) => {
    return json({
        result: await getN2ApiStatus(),
        updatedOn: new Date(),
    });
};
