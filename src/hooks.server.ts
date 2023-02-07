import type { Handle } from '@sveltejs/kit';

import {
    getSolanaStatus,
    getPaymentsStatus,
    getWalletInitStatus,
    getApiStatus,
} from '$lib/server/statuses';
import { getLastestPayments, getLastestWallets } from '$lib/server/latests';
import { getiOSVersion, getAndroidVersion } from '$lib/server/apps';

let updatedAt: string;
let statuses: App.Locals['statuses'];
let latests: App.Locals['latests'];

const getUpdateStatuses = async () => {
    await Promise.all([
        getSolanaStatus(),
        getPaymentsStatus(),
        getWalletInitStatus(),
        getApiStatus(),
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
        .catch((error) => {
            // console.log('getUpdateStatuses:error', error.message);
        });

    return statuses;
};

const getUpdateLatests = async () => {
    await Promise.all([
        getLastestPayments(),
        getLastestWallets(),
        getiOSVersion(),
        getAndroidVersion(),
    ])
        .then(([payments, wallets, ios, android]) => {
            latests = {
                ios,
                android,
                wallets,
                payments,
                time: new Date(),
            };
        })
        .catch((error) => {
            // console.log('getUpdateLatests:error', error.message);
        });

    return latests;
};

export const handle: Handle = async ({ event, resolve }): Promise<Response> => {
    // статусы
    event.locals.statuses = statuses ?? (await getUpdateStatuses());

    // свежие данные
    event.locals.latests = latests ?? (await getUpdateLatests());

    // последнее обновление
    event.locals.updatedAt = updatedAt;

    const response = await resolve(event);
    response.headers.set('x-cache-update', updatedAt);

    return response;
};

// этот таймаут будет обновлять данные каждые полминуты
setInterval(async () => {
    await getUpdateLatests();
    await getUpdateStatuses();

    updatedAt = new Date().toUTCString();
    // console.log('data:updates:tick', updatedAt);
}, 30 * 1000);

// обновит данные после старта приложения
setTimeout(async () => {
    await getUpdateLatests();
    await getUpdateStatuses();

    updatedAt = new Date().toUTCString();
    // console.log('data:updates:init', updatedAt);
}, 250);
