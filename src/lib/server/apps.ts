import gplay from 'google-play-scraper';

const apps = {
    ios: {
        name: 'com.mapswithme.full',
        href: '//apps.apple.com/app/id510623322',
    },
    android: {
        name: 'com.mapswithme.maps.pro',
        href: '//play.google.com/store/apps/details?id=com.mapswithme.maps.pro',
    },
};

// информация о актуальной версии iOS-приложения
const getiOSVersion = async () => {
    const now = new Date().getTime();
    const versionURL = `https://itunes.apple.com/lookup?bundleId=${apps.ios.name}&_r=${now}`;

    const res = await fetch(versionURL);
    const result = await res.json();
    const info = result.results[0];

    return {
        href: apps.ios.href,
        latest: info.version,
        releaseDate: new Date(info.currentVersionReleaseDate),
        // releaseNotes: info.releaseNotes,
    };
};

// информация о актуальной версии Adnroid-приложения
const getAndroidVersion = async () => {
    const info = await gplay.app({ appId: apps.android.name });

    return {
        href: apps.android.href,
        latest: info.version.replace('-googleRelease', '').replace('v', ''),
        releaseDate: new Date(info.updated),
        // releaseNotes: '',
    };
};

export { getiOSVersion, getAndroidVersion };
