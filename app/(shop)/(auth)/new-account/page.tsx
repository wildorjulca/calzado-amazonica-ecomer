
import Link from 'next/link'
import RegiterForm from './ui/register-form'

const NewAccountPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center py-4">
            <div className="w-full max-w-md rounded-md border-gray-100 bg-white px-8 py-16 shadow-sm">

                {/* Título */}
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-neutral-900">
                        Crear  cuenta
                    </h1>
                    <p className="mt-1 text-sm text-neutral-500">
                        Se parte de la familia ACME
                    </p>
                </div>

                {/* Formulario */}
                <RegiterForm />

                {/* Footer */}
                <div className="mt-6 text-center text-sm text-neutral-500">
                    ¿Si tienes cuenta?{' '}
                    <Link href="/login" className="font-medium text-black hover:underline">
                        Iniciar session
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NewAccountPage
