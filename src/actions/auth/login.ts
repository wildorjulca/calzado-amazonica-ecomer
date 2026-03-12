'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
        return "Success"
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export const login = async (email: string, password_hash: string) => {
    try {
        await signIn("credentials", {
            email: email,
            password: password_hash
        })
        return {
            ok: true
        }

    } catch (error) {
        console.log("Error", error)
        return {
            ok: false,
            message: "Error al authenticarse"
        }

    }

}