import { getWalletsInitStatus } from '$lib/server/statuses';
import { json } from '@sveltejs/kit';

export const GET = async (event) => {
    return json ({
        result: await getWalletsInitStatus(),
        updatedOn: new Date(),
    });
};
