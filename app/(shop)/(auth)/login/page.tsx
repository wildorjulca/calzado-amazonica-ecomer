import { GoogleIcon } from '@/src/components/icons/GoogleIcon'
import { GoalIcon } from 'lucide-react'
import React from 'react'
import LoginForm from './ui/login-form'
import Link from 'next/link'

const page = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 px-4">
      <div className="w-full max-w-md rounded-md bg-white px-8 py-16 shadow-sm">

        {/* Título */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-neutral-900">
            Iniciar sesión
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Accede a tu cuenta
          </p>
        </div>

        {/* Formulario */}
        <LoginForm />


        {/* Footer */}
        <div className="mt-6 text-center text-sm text-neutral-500">
          ¿No tienes cuenta?{' '}
          <Link href="/new-account" className="font-medium text-black hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  )
}

export default page
