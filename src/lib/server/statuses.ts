// статус работы блокчейна Solana
export const getSolanaStatus = async () => {
    const solanaStatusURL = 'https://status.solana.com/api/v2/status.json';

    const res = await fetch(solanaStatusURL);
    const data = await res.json();
    const status = data['status']['description'] === 'All Systems Operational';

    return {
        status,
        time: new Date(),
    };
};

// статус работы платёжного аккаунта
export const getPaymentsStatus = async () => {
    const paymentCheckURL =
        'https://public-api.solscan.io/account/splTransfers?account=4xoejpfekwW4kUizMNhRhtmXbnJhEdZ2A65XugEZFdyX&limit=10&offset=0';
    const now = Math.floor(Date.now() / 1000);

    // ищем в списке последних транзакций есть платёжная необходимой свежести
    const status = (await (await fetch(paymentCheckURL)).json())['data'].some((trx: any) => {
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
    const paymentCheckURL =
        'https://public-api.solscan.io/account/splTransfers?account=D49P3MvLWanK8XfF6XhG4YnLsYfmH2VZRLr8N16tqM3e&limit=10&offset=0';
    const now = Math.floor(Date.now() / 1000);

    // ищем в списке последних транзакций есть платёжная необходимой свежести
    const status = (await (await fetch(paymentCheckURL)).json())['data'].some((trx: any) => {
        const diff = now - trx.blockTime;
        return diff < 21600 && trx.changeType === 'inc' && trx.changeAmount === 10000000;
    });

    return {
        status,
        time: new Date(),
    };
};

// статусы доступности системных сервисов
export const getApiStatus = async () => {
    const n2StatusURL = 'https://api-dev.n2.org/pub/solana-liveness/n2/status';
    const n2SolanaStatusURL = 'https://api-dev.n2.org/pub/solana-liveness/solana/status';

    return {
        api: (await (await fetch(n2StatusURL)).json())['status'] === 'GREEN',
        apiSolana: (await (await fetch(n2SolanaStatusURL)).json())['status'] === 'GREEN',
    };
};
