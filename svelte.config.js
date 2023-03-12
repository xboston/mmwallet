// import adapter from '@sveltejs/adapter-vercel';
import adapter from '@sveltejs/adapter-auto';
// import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        // default options are shown
        adapter: adapter(),
    },
    // preprocess: vitePreprocess(),
    // vitePlugin: {
    //     experimental: {
    //         inspector: true,
    //     },
    // },
};

export default config;
