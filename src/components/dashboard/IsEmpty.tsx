'use client'

import Lottie from 'lottie-react'
import emptylotti from '@/public/empty.json'

const IsEmpty = () => {
    return (
        <div className="flex items-center justify-center py-16">
            <div className="flex flex-col items-center text-center max-w-md">

                <Lottie
                    animationData={emptylotti}
                    className="w-48 sm:w-72"
                    loop={false}
                />

                <h2 className="mt-6 text-2xl font-semibold text-gray-800">
                    Aún no tienes pedidos
                </h2>

                <p className="mt-2 text-gray-500 text-sm sm:text-base">
                    Cuando realices tu primera compra, aquí podrás ver el estado
                    y el historial de tus pedidos.
                </p>

            </div>
        </div>
    )
}

export default IsEmpty