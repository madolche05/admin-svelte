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
            let errorMessage = 'Terjadi kesalahan saat login.';
            
            // Mapping error message dari Supabase
            if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Email atau password salah.';
            } else if (error.message.includes('Email not confirmed')) {
                errorMessage = 'Email belum dikonfirmasi. Silakan cek inbox Anda.';
            } else {
                 errorMessage = error.message;
            }

            return fail(400, { email, error: errorMessage });
        }

        throw redirect(303, '/');
    }
};