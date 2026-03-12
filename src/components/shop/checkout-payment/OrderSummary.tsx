'use client'

import { Badge } from '@/components/ui/badge'
import { textFont2, textFont3, textFont4 } from '@/config/fonts'
import { useCartStore } from '@/src/store'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import OrderSummarySkeleton from '../skeleton/OrderSummarySkeleton'

export const OrderSummary = () => {
    const { cart, hasHydrated } = useCartStore((state) => state)

    const subTotal = cart.reduce((acc, item) => acc + item.cantidad * item.precio, 0)
    const tax = subTotal * 0.18
    const total = subTotal + tax

    if (!hasHydrated) {
        return (
            <OrderSummarySkeleton />
        )
    }

    return (
        <div>
            <div className="flex flex-col gap-4">
                {cart.map((item) => (
                    <div
                        className='w-full flex gap-4 items-center'
                        key={item.varianteId}
                    >
                        <div className="relative size-16 shrink-0 bg-white rounded-md flex items-center justify-center border">
                            <Image
                                src={`/images/products/${item.imagen}`}
                                alt={item.nombre}
                                width={64}
                                height={64}
                            />

                            <Badge className="absolute -top-2 -right-2 z-20 h-5 min-w-5 flex items-center justify-center rounded-sm px-1 text-xs">
                                {item.cantidad}
                            </Badge>
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <div>
                                <p className={`${textFont4.className} antialiased uppercase text-sm`}>{item.nombre}</p>
                                <p className='text-gray-500 text-sm'>{item.color} / {item.talla}</p>
                            </div>
                            <p> S/ {item.precio}</p>
                        </div>
                    </div>
                ))}

                {/* resuement totals de la orden */}
                <div>
                    <div className='flex w-full justify-between text-sm items-center'>
                        <p>Subtotal</p>
                        <p>S/ {subTotal.toFixed(2)}</p>
                    </div>
                    <div className='flex w-full justify-between text-sm items-center'>
                        <p>Envio</p>
                        <p>Gratis</p>
                    </div>
                </div>

                <div>
                    <div className='w-full flex justify-between'>
                        <p className={`${textFont2.className} antialiased text-lg font-semibold`}>Total</p>
                        <p className={`${textFont2.className} antialiased text-lg font-semibold`}>S/ {total.toFixed(2)}</p>
                    </div>
                    <p className='text-sm text-gray-500'>Incluye S/ {tax.toFixed(2)} de impuestos</p>
                </div>

            </div>
        </div>
    )
}
