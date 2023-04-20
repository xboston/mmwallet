import { json } from '@sveltejs/kit';

import { getiOSVersion, getAndroidVersion } from '$lib/server/apps';

let latests = {
    update: Date.now(),
    ios: {
        href: '',
        latest: '',
        releaseDate: new Date(),
    },
    android: {
        href: '',
        latest: '',
        releaseDate: new Date(),
    },
};

export const GET = async () => {
    if (Date.now() - latests.update > 10000 || latests.ios.href === '') {
        await Promise.all([getiOSVersion(), getAndroidVersion()])
            .then(([ios, android]) => {
                let update = Date.now();
                latests = {
                    update,
                    ios,
                    android,
                };
            })
            .catch((_error) => {
                console.log('getUpdateLatests:error', _error.message);
            });
    }

    return json({
        result: {
            ios: latests.ios,
            android: latests.android,
        },
    });
};
