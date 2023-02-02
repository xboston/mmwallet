// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types

declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            updatedAt: String;
            statuses: {
                solana: {
                    status: boolean;
                    time: Date;
                };
                payments: {
                    status: boolean;
                    time: Date;
                };
                wallets: {
                    status: boolean;
                    time: Date;
                };
                api: {
                    api: boolean;
                    apiSolana: boolean;
                    time: Date;
                };
                time: Date;
            };
            latests: {
                ios: {
                    latest: String;
                    href: String;
                    releaseDate: Date;
                };
                android: {
                    latest: String;
                    href: String;
                    releaseDate: Date;
                };
                wallets: {
                    data: {
                        signature: String;
                        signature_short: String;
                        amount: Number;
                        amount_usd: Number;
                        plan: String;
                        time: Date;
                    };
                };
                payments: {
                    data: {
                        signature: String;
                        signature_short: String;
                        amount: Number;
                        amount_usd: Number;
                        time: Date;
                    };
                };
                time: Date;
            };
        }
        // interface PageData {}
        // interface Platform {}
    }
}

export {};
