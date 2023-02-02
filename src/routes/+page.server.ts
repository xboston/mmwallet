import type { PageLoad } from './$types';

export const load = (async ({ fetch, locals }) => {
    const resStatus = await fetch(`/api/status`);
    const status = await resStatus.json();

    const resLatest = await fetch(`/api/latest`);
    const latest = await resLatest.json();

    return {
        now: locals.updatedAt,
        statuses: status,
        latest: latest.latests,
    };
}) satisfies PageLoad;
