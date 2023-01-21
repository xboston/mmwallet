// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
    namespace App {
        // interface Error {}
        interface Locals {
            statuses: object;
            latests: object;
        }
        // interface PageData {}
        // interface Platform {}

        interface Statuses {
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
            };
            time: Date;
            timeLocal: string;
        }
    }
}

export {};
