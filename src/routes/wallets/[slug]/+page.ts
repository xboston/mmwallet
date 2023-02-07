import type { PageLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        now: Date.now(),
        params,
    };
}) satisfies PageLoad;
