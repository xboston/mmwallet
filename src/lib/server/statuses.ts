import { QUICKNODE_URL } from '$env/static/private';

import web3, { PublicKey } from '@solana/web3.js';

// системные кошельки приложения
const coreWallets = {
    payments: '4xoejpfekwW4kUizMNhRhtmXbnJhEdZ2A65XugEZFdyX',
    walletInit: 'D49P3MvLWanK8XfF6XhG4YnLsYfmH2VZRLr8N16tqM3e',
};

// адресоа токенов
const tokens = {
    usdc: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
};

// цена выпуска карты
const cardPrice = 10000000;

const checkTransactionsLimit = 10;

let solana = new web3.Connection(QUICKNODE_URL, 'confirmed');

// статус работы платёжного аккаунта
export const getPaymentsStatus = async () => {
    const now = Math.floor(Date.now() / 1000);
    const transactions = await getLatestTransactions(coreWallets.payments);

    // ищем в списке последних транзакций входящий платёж необходимой свежести
    const status = transactions.some((trx: any) => {
        const diff = now - trx.blockTime;
        return diff < 21600 && trx.changeType === 'inc';
    });

    return {
        status,
        transactions,
        time: new Date(),
    };
};

/**
 * Получение списка последних транзакций по адресу аккаунта
 * @param address string
 * @returns
 */
export const getLatestTransactions = async (address: string) => {
    const base58publicKey = new PublicKey(address);

    const signatures = await solana.getSignaturesForAddress(base58publicKey, {
        limit: checkTransactionsLimit,
    });

    const signaturesList = signatures.map((signature) => signature.signature);
    const transactions = await solana.getParsedTransactions(signaturesList);

    let transactionList: any = [];
    transactions.map((transaction) => {
        if (transaction !== null && typeof transaction !== 'undefined') {
            const trans = transaction?.transaction.message.instructions.find((instruction) =>
                instruction?.programId.equals(new PublicKey(tokens.usdc))
            );
            const transactionShortData = {
                time: new Date(transaction?.blockTime * 1000),
                blockTime: transaction?.blockTime,
                changeType: trans?.parsed.info.destination === address ? 'inc' : 'desc',
                changeAmount: trans?.parsed.info.amount,
                amount_usd: Math.floor(trans?.parsed.info.amount / 10000) / 100,
                signature: transaction?.transaction.signatures[0],
                // transaction: trans,
                // transactionFull: transaction,
            };

            transactionList.push(transactionShortData);
        }
    });

    return transactionList;
};

// статус работы регистратора кошельков
export const getWalletsInitStatus = async () => {
    const now = Math.floor(Date.now() / 1000);
    const transactions = await getLatestTransactions(coreWallets.walletInit);

    // ищем в списке последних транзакций есть транзакция выпуска карты
    const status = transactions.some((trx: any) => {
        const diff = now - trx.blockTime;
        return diff < 21600 && trx.changeType === 'inc' && trx.changeAmount === cardPrice;
    });

    return {
        status,
        transactions,
        time: new Date(),
    };
};
