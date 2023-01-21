const banAccount = '4xoejpfekwW4kUizMNhRhtmXbnJhEdZ2A65XugEZFdyX';
const limit = 10;

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
                time_local: new Date(trx.blockTime * 1000).toLocaleString(),
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

const truncateHash = (hash: string) => {
    return hash.substring(0, 4) + '...' + hash.substring(hash.length - 4);
};
