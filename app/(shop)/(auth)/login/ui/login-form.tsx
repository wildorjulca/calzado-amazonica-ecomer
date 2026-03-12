'use client'

import { authenticate } from '@/src/actions/auth/login'
import React, { useActionState } from 'react'
import { GoogleIcon } from '@/src/components/icons/GoogleIcon'
import { LucideAlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearchParams } from 'next/navigation';
import { Spinner } from "@/components/ui/spinner"
import { signIn } from 'next-auth/react'

const LoginForm = () => {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    const searchParams = useSearchParams()

    //   callbackUrl.get('callbackUrl') || '/dashboard';

    const redirectTo = searchParams.get('redirectTo') || '/dashboard';


    // useEffect(() => {
    //     if (errorMessage === "Success") {
    //         window.location.replace("/");
    //     }
    // }, [errorMessage])


    const handleGoogleLogin = async () => {
        console.log("llego aca")
        try {
           const res =  await signIn("google")
           console.log(res)

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <div>
            <form
                action={formAction}
                className="space-y-4">

                {/* Email */}
                <div>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                        Email
                    </label>
                    <input
                        type="text"
                        id='email'
                        name="email"
                        placeholder="Search for products..."
                        autoComplete="on"
                        className="px-4 py-3 w-full rounded-md border border-neutral-300 bg-transparent bg-white  pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
                    />
                </div>

                {/* Password */}
                <div className='relative'>
                    <label className="mb-1 block text-sm font-medium text-neutral-700">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id='password'
                        name="password"
                        placeholder="••••••••"
                        className="h-11  w-full rounded-md border border-neutral-300 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    {/* <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
                </div>
                {errorMessage && (
                    <div className='flex items-center justify-center gap-2'>
                        <LucideAlertCircle className="h-5 w-5 text-red-500" />
                        <p className="text-red-600">{errorMessage}</p>
                    </div>
                )}
                <input type="hidden" name="redirectTo" value={redirectTo} />

                {/* Botón */}
                <Button
                    disabled={isPending}
                    className='w-full h-12 hover:cursor-pointer'>
                    {isPending ? (
                        <>
                            <Spinner data-icon="inline-start" />
                            Cargando...
                        </>
                    ) : (
                        " Iniciar session"

                    )}
                </Button>

                <span className="relative z-10 block font-medium text-center mt-4.5">
                    <span className="block absolute -z-10 left-0 top-1/2 h-px w-full bg-gray-200"></span>
                    <span className="inline-block px-3 bg-white">Or</span>
                </span>
            </form>

            <button
                type='submit'
                onClick={handleGoogleLogin}
                className='border w-full flex items-center justify-center gap-2 py-2 rounded-sm hover:cursor-pointer hover:bg-neutral-100'>
                <GoogleIcon className='h-6 w-6' /> Iniciar sesion con Google
            </button>

        </div>

    )
}

export default LoginForm