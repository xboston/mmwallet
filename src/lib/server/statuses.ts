const coreWallets = {
    payments: '4xoejpfekwW4kUizMNhRhtmXbnJhEdZ2A65XugEZFdyX',
    walletInit: 'D49P3MvLWanK8XfF6XhG4YnLsYfmH2VZRLr8N16tqM3e',
};

const solscanAPIURLbase = 'https://public-api.solscan.io';
const solanaStatusURL = 'https://status.solana.com/api/v2/status.json';
const n2StatusURL = 'https://api-dev.n2.org/pub/solana-liveness/n2/status';
const n2SolanaStatusURL = 'https://api-dev.n2.org/pub/solana-liveness/solana/status';

const checkTransactionsLimit = 10;

// статус работы платёжного аккаунта
export const getPaymentsStatus = async () => {
    const now = Math.floor(Date.now() / 1000);
    const paymentCheckURL = `${solscanAPIURLbase}/account/splTransfers?account=${coreWallets.payments}&limit=${checkTransactionsLimit}&offset=0`;

    const res = await fetch(paymentCheckURL);
    const result = await res.json();

    // ищем в списке последних транзакций есть платёжная необходимой свежести
    const status = result['data'].some((trx: any) => {
        const diff = now - trx.blockTime; // время с последнего блока платежей до текущего
        return diff < 300 && trx.changeType === 'inc'; // в течении последних 5 минут было хотя бы одна оплата
    });

    return {
        status,
        time: new Date(),
    };
};

// статус работы регистратора кошельков
export const getWalletInitStatus = async () => {
    const now = Math.floor(Date.now() / 1000);
    const paymentCheckURL = `${solscanAPIURLbase}/account/splTransfers?account=${coreWallets.walletInit}&limit=${checkTransactionsLimit}&offset=0`;

    const res = await fetch(paymentCheckURL);
    const result = await res.json();

    // ищем в списке последних транзакций есть платёжная необходимой свежести
    const status = result['data'].some((trx: any) => {
        const diff = now - trx.blockTime;
        return diff < 21600 && trx.changeType === 'inc' && trx.changeAmount === 10000000;
    });

    return {
        status,
        time: new Date(),
    };
};

// статус работы блокчейна Solana
export const getSolanaStatus = async () => {
    const res = await fetch(solanaStatusURL);
    const data = await res.json();
    const status = data['status']['description'] === 'All Systems Operational';

    return {
        status,
        time: new Date(),
    };
};

// статусы доступности системных сервисов
export const getApiStatus = async () => {
    // @todo - сомнительно
    const [api, apiSolana] = await Promise.all(
        [n2StatusURL, n2SolanaStatusURL].map((u) => fetch(u))
    ).then((responses) => Promise.all(responses.map((res) => res.json())));

    return {
        api: api['status'] === 'GREEN',
        apiSolana: apiSolana['status'] === 'GREEN',
        time: new Date(),
    };
};
