import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

import {
    getSolanaStatus,
    getPaymentsStatus,
    getWalletsInitStatus,
    getN2ApiStatus,
} from '$lib/server/statuses';

/** @type {import('./$types').RequestHandler} */
export const GET: RequestHandler = async (event) => {
    let statuses = event.locals.statuses;

    await Promise.all([
        getSolanaStatus(),
        getPaymentsStatus(),
        getWalletsInitStatus(),
        getN2ApiStatus(),
    ])
        .then(([solana, payments, wallets, api]) => {
            statuses = {
                solana,
                payments,
                wallets,
                api,
                time: new Date(),
            };
        })
        .catch((_error) => {
            console.log('getUpdateStatuses:error', _error.message);
        });

    return json({
        statuses: statuses,
        updatedOn: new Date(),
    });
};
