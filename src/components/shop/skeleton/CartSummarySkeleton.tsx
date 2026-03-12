'use client'

import React from 'react'

const CartSummarySkeleton = () => {
    return (
        <div className="mt-3 animate-pulse space-y-4">
            {/* Productos y subtotal */}
            <div className="flex w-full justify-between">
                <div className="h-5 bg-gray-300 w-1/3"></div>
                <div className="h-5 bg-gray-300 w-20"></div>
            </div>

            {/* Entrega */}
            <div className="flex justify-between">
                <div className="h-5 bg-gray-300 w-24"></div>
                <div className="h-5 bg-gray-300 w-16"></div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mt-2">
                <div className="flex flex-col space-y-1">
                    <div className="h-5 bg-gray-300 w-28"></div>
                    <div className="h-4 bg-gray-300 w-36"></div>
                </div>
                <div className="h-5 bg-gray-300 w-24"></div>
            </div>

            {/* Botón de pago */}
            <div className="mt-4">
                <div className="h-12 w-full bg-gray-300"></div>
            </div>

            {/* Opciones de pago */}
            <div className="mt-4 space-y-2">
                <div className="h-5 w-36 bg-gray-300"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-12 bg-gray-300"></div>
                    <div className="h-8 w-12 bg-gray-300"></div>
                    <div className="h-8 w-12 bg-gray-300"></div>
                    <div className="h-8 w-12 bg-gray-300"></div>
                </div>
            </div>
        </div>
    )
}

export default CartSummarySkeleton