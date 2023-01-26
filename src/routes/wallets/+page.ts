import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
    const resLatest = await fetch(`/api/latest`);
    const latest = await resLatest.json();

    return {
        now: Date.now(),

        latest: latest.latests,
    };
}) satisfies PageLoad;
