import { json } from '@sveltejs/kit';

export const GET = (event) => {
    return json({
        status: 'ok!',
    });
};
