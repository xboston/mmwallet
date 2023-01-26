import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
    return {
        now: Date.now(),
        params,
    };
}) satisfies PageLoad;
