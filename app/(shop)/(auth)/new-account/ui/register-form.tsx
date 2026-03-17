'use client'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/src/actions/auth/login';
import { registerUser } from '@/src/actions/auth/register';
import ErrorMessage from '@/src/components/shop/ErrorMessage';
import { AlertCircleIcon } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'

type FormImputs = {
    nombre: string;
    apellido: string;
    email: string;
    password_hash: string;


}
const RegiterForm = () => {



    const [isPending, startTransition] = useTransition()
    const [errorMessage, seterrorMessage] = useState<string | null>(null)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormImputs>()


    const onSubmit: SubmitHandler<FormImputs> = (data) => {
        seterrorMessage(null)
        // console.log(data)
        startTransition(async () => {
            const res = await registerUser(data)
            if (!res.ok) {
                seterrorMessage(res.message)
                return
            }
            const { email, password_hash } = data
            await login(email, password_hash)
            window.location.replace("/")
        })

    }

    return (
        <form
            className='space-y-4 w-full'
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Nombres
                </label>
                <input
                    type="text"
                    placeholder="Ingrese su nombre"
                    autoComplete="on"
                    className="px-4 py-3 w-full rounded-md border border-neutral-300 bg-transparent bg-white  pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
                    {...register("nombre", {
                        required: "Campo requerido",
                        maxLength: {
                            value: 100,
                            message: "El nombre es demasiado largo (máximo 100 caracteres)"
                        }
                    })}
                />
                {errors.nombre && <ErrorMessage message={errors.nombre.message} />}
            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Apellidos
                </label>
                <input
                    type="text"
                    placeholder="Ingrese sus apellidos"
                    autoComplete="on"
                    className="px-4 py-3 w-full rounded-md border border-neutral-300 bg-transparent bg-white  pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
                    {...register("apellido", {
                        required: "Campo requerido",
                        maxLength: {
                            value: 100,
                            message: "El apellido es demasiado largo (máximo 100 caracteres)"

                        }
                    })}
                />
                {errors.apellido && <ErrorMessage message={errors.apellido.message} />}

            </div>
            <div>
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Email
                </label>
                <input
                    type="email"
                    placeholder="Ingresa tu correo electrónico"
                    autoComplete="email"
                    className="px-4 py-3 w-full rounded-md border border-neutral-300 bg-white pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
                    {...register("email", {
                        required: "El correo electrónico es obligatorio",
                        maxLength: {
                            value: 100,
                            message: "El email es demasiado largo (máximo 100 caracteres)"
                        },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresa un correo electrónico válido (ej. nombre@correo.com)"
                        }
                    })}
                />
                {errors.email && <ErrorMessage message={errors.email.message} />}

            </div>
            {/* Password */}
            <div className="relative">
                <label className="mb-1 block text-sm font-medium text-neutral-700">
                    Contraseña
                </label>

                <input
                    type="password"
                    id="password"
                    placeholder="Mínimo 8 caracteres"
                    autoComplete="current-password"
                    className="h-11 w-full rounded-md border border-neutral-300 bg-white px-4 text-sm text-black placeholder:text-neutral-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                    {...register("password_hash", {
                        required: "La contraseña es obligatoria",
                        minLength: {
                            value: 8,
                            message: "La contraseña debe tener al menos 8 caracteres"
                        }
                    })}
                />
                {errors.password_hash && <ErrorMessage message={errors.password_hash.message} />}
            </div>
            {errorMessage && (
                <div className='flex items-center justify-center gap-1 text-red-600'>
                    <AlertCircleIcon size={20} />
                    <p>{errorMessage}</p>
                </div>
            )}
            <Button
                disabled={isPending}
                className='w-full h-12 hover:cursor-pointer'>
                {isPending ? (
                    <>
                        <Spinner data-icon="inline-start" />
                        Cargando...
                    </>
                ) : (
                    "Crear cuenta"

                )}
            </Button>

        </form>
    )
}

export default RegiterForm