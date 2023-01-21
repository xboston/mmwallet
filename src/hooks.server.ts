import type { Handle } from '@sveltejs/kit';

import { getSolanaStatus, getPaymentsStatus, getWalletInitStatus } from '$lib/server/statuses';
import { getLastestPayments } from '$lib/server/latests';

let updatedAt: string;
let statuses: App.Statuses;
let latests: object;

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
    // статусы
    event.locals.statuses = statuses ?? (await getUpdateStatuses());

    // свежие данные
    event.locals.latests = latests ?? (await getUpdateLatests());

    const response = await resolve(event);
    response.headers.set('x-cache-update', updatedAt);

    return response;
};

const getUpdateStatuses = async () => {
    const [solana, payments, wallets] = await Promise.all([
        getSolanaStatus(),
        getPaymentsStatus(),
        getWalletInitStatus(),
    ]);

    statuses = {
        solana,
        payments,
        wallets,
        time: new Date(),
    };

    console.log('getUpdateStatuses:now', statuses);
    updatedAt = new Date().toUTCString();

    return statuses;
};

const getUpdateLatests = async () => {
    const [payments] = await Promise.all([getLastestPayments()]);

    latests = {
        payments,
        time: new Date(),
    };

    console.log('getUpdateLatests:now', latests);
    updatedAt = new Date().toUTCString();

    return latests;
};

setInterval(async () => {
    await getUpdateLatests();
    await getUpdateStatuses();
}, 30 * 1000);
