export const load = async ({ fetch }) => {
    const appData = async () => {
        const resApp = await fetch(`/api/app`);
        return await resApp.json();
    };

    const n2Data = async () => {
        const resN2 = await fetch(`/api/n2`);
        return await resN2.json();
    };

    const solanaData = async () => {
        const resSolana = await fetch(`/api/solana`);
        return await resSolana.json();
    };

    const paymentsData = async () => {
        const resPayments = await fetch(`/api/payments`);
        return await resPayments.json();
    };

    const walletsData = async () => {
        const resWallets = await fetch(`/api/wallets`);
        return await resWallets.json();
    };

    return {
        app: appData(),
        n2: n2Data(),
        solana: solanaData(),
        payments: paymentsData(),
        wallets: walletsData(),
        now: new Date(),
    };
};
