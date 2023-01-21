import type { Handle } from '@sveltejs/kit';

import {
    getSolanaStatus,
    getPaymentsStatus,
    getWalletInitStatus,
    getApiStatus,
} from '$lib/server/statuses';
import { getLastestPayments } from '$lib/server/latests';

import { getiOSVersion, getAndroidVersion } from '$lib/server/apps';

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
    const [solana, payments, wallets, api] = await Promise.all([
        getSolanaStatus(),
        getPaymentsStatus(),
        getWalletInitStatus(),
        getApiStatus(),
    ]);

    statuses = {
        solana,
        payments,
        wallets,
        api,
        time: new Date(),
        timeLocal: new Date().toLocaleString(),
    };

    // console.log('getUpdateStatuses:now', statuses);

    return statuses;
};

const getUpdateLatests = async () => {
    const [payments, ios, android] = await Promise.all([
        getLastestPayments(),
        getiOSVersion(),
        getAndroidVersion(),
    ]);

    latests = {
        payments,
        ios,
        android,
        time: new Date(),
        timeLocal: new Date().toLocaleString('ru-RU', { timeZone: 'UTC' }),
    };

    // console.log('getUpdateLatests:now', latests);

    return latests;
};

setInterval(async () => {
    await getUpdateLatests();
    await getUpdateStatuses();

    updatedAt = new Date().toUTCString();
}, 30 * 1000);
