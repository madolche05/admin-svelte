import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
    default: async ({ request, locals: { supabase } }) => {
        const data = await request.formData();
        const email = data.get('email') as string;
        const password = data.get('password') as string;

        if (!email || !password) {
            return fail(400, { email, error: 'Email dan password harus diisi.' });
        }

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return fail(400, { email, error: error.message });
        }

        throw redirect(303, '/');
    }
};