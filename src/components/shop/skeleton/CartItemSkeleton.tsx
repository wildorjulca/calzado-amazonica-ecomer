'use client'

import React from 'react'

const CartItemSkeleton = () => {
    return (
        <div className="w-full mb-2 border  flex gap-5 pr-3 animate-pulse">
            {/* Imagen placeholder */}
            <div className="size-30 shrink-0 bg-gray-200" />

            {/* Contenido placeholder */}
            <div className="w-full py-4 space-y-2">
                <div className="flex items-center justify-between w-full">
                    {/* Nombre placeholder */}
                    <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                    {/* Precio placeholder */}
                    <div className="flex items-center gap-2">
                        <div className="h-5 bg-gray-300 rounded w-12"></div>
                        <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
                    </div>
                </div>
                {/* Talla placeholder */}
                <div className="h-4 bg-gray-300 rounded w-1/3"></div>
            </div>
        </div>
    )
}

export default CartItemSkeleton