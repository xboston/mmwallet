const banAccount = '4xoejpfekwW4kUizMNhRhtmXbnJhEdZ2A65XugEZFdyX';
const initWalletsAccount = 'D49P3MvLWanK8XfF6XhG4YnLsYfmH2VZRLr8N16tqM3e';

const limit = 10;

const truncateHash = (hash: string) => {
    return hash.substring(0, 4) + '...' + hash.substring(hash.length - 4);
};

const getPlanName = (amount: number) => {
    let name = 'uncn';
    switch (amount) {
        case 10000000:
            name = 'Free';
            break;
        case 36000000:
            name = 'Happy Camper';
            break;
        case 150000000:
            name = 'Digital Nomad';
            break;
        case 360000000:
            name = 'High Flyer';
            break;

        default:
            break;
    }

    return name;
};

// свежие платежи по картам
export const getLastestPayments = async () => {
    const trxLimit = limit * 2;
    const paymentCheckURL = `https://public-api.solscan.io/account/splTransfers?account=${banAccount}&limit=${trxLimit}&offset=0`;

    const resPayment = await fetch(paymentCheckURL);

    // ищем в списке последних транзакций есть платёжная необходимой свежести
    const data = (await resPayment.json())['data']
        .filter((trx: any) => {
            // нужны только входящие платежи
            return (
                trx.changeAmount > 0 && parseInt(trx.postBalance, 10) > parseInt(trx.preBalance, 10)
            );
        })
        .map((trx: any) => {
            return {
                signature: trx.signature[0],
                signature_short: truncateHash(trx.signature[0]),
                amount: trx.changeAmount,
                amount_usd: Math.floor(trx.changeAmount / 10000) / 100,
                time: new Date(trx.blockTime * 1000),
                // showed: trx.changeAmount > 0 && parseInt(trx.postBalance, 10) > parseInt(trx.preBalance, 10),
                // from: trx,
            };
        })
        .splice(0, limit);

    return {
        data,
        time: new Date(),
    };
};

// свежие регистраци кошельков
export const getLastestWallets = async () => {
    const trxLimit = limit * 2;
    const paymentCheckURL = `https://public-api.solscan.io/account/splTransfers?account=${initWalletsAccount}&limit=${trxLimit}&offset=0`;

    const resPayment = await fetch(paymentCheckURL);

    const data = (await resPayment.json())['data']
        .filter((trx: any) => {
            // нужны только входящие платежи больше 10000000 (цена выпуска карты, минимальная сумма входа в систеу)
            return (
                trx.changeAmount >= 10000000 &&
                parseInt(trx.postBalance, 10) > parseInt(trx.preBalance, 10)
            );
        })
        .map((trx: any) => {
            return {
                signature: trx.signature[0],
                signature_short: truncateHash(trx.signature[0]),
                amount: trx.changeAmount,
                amount_usd: Math.floor(trx.changeAmount / 10000) / 100,
                plan: getPlanName(trx.changeAmount),
                time: new Date(trx.blockTime * 1000),
                // showed: trx.changeAmount > 0 && parseInt(trx.postBalance, 10) > parseInt(trx.preBalance, 10),
                // from: trx,
            };
        })
        .splice(0, limit);

    return {
        data,
        time: new Date(),
    };
};
