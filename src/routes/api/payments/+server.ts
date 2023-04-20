import { json } from '@sveltejs/kit';

import { getPaymentsStatus } from '$lib/server/statuses';

export const GET = async (event) => {
    return json({
        result: await getPaymentsStatus(),
        updatedOn: new Date(),
    });
};
