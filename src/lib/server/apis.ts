const solanaStatusURL = 'https://status.solana.com/api/v2/status.json';
const n2StatusURL = 'https://api-dev.n2.org/pub/solana-liveness/n2/status';
const n2SolanaStatusURL = 'https://api-dev.n2.org/pub/solana-liveness/solana/status';

// статус работы блокчейна Solana
export const getSolanaStatus = async () => {
    const res = await fetch(solanaStatusURL);
    const data = await res.json();
    const status = data['status']['description'] === 'All Systems Operational';

    return {
        status,
    };
};

// статусы доступности системных сервисов
export const getN2ApiStatus = async () => {
    // @todo - сомнительно
    const [api, apiSolana] = await Promise.all(
        [n2StatusURL, n2SolanaStatusURL].map((u) => fetch(u))
    ).then((responses) => Promise.all(responses.map((res) => res.json())));

    return {
        apiApplication: api['status'] === 'GREEN',
        apiSolanaBridge: apiSolana['status'] === 'GREEN',
    };
};
