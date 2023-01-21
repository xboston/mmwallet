import gplay from 'google-play-scraper';

// информация о актуальной версии iOS-приложения
const getiOSVersion = async () => {
    const versionURL =
        'https://itunes.apple.com/lookup?bundleId=com.mapswithme.full&r=' + new Date().getTime();

    const info = (await (await fetch(versionURL)).json()).results[0];

    return {
        latest: info.version,
        releaseDate: new Date(info.currentVersionReleaseDate),
        releaseDateShort: new Date(info.currentVersionReleaseDate).toLocaleString('ru-RU', {
            timeZone: 'UTC',
        }),
        // releaseNotes: info.releaseNotes,
    };
};

// информация о актуальной версии Adnroid-приложения
const getAndroidVersion = async () => {
    const info = await gplay.app({ appId: 'com.mapswithme.maps.pro' });

    return {
        latest: info.version.replace('-googleRelease', '').replace('v', ''),
        releaseDate: new Date(info.updated),
        releaseDateShort: new Date(info.updated).toLocaleString('ru-RU', { timeZone: 'UTC' }),
        // releaseNotes: '',
    };
};

export { getiOSVersion, getAndroidVersion };
