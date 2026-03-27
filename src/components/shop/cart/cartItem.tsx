'use client'

import { Button } from '@/components/ui/button'
import { textFont3, textFont4, titleFont } from '@/config/fonts'
import { CartProduct, useCartStore } from '@/src/store'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import QuantitySelector from './quantitySelector'

interface Props {
    item: CartProduct
}

const CartItem = ({ item }: Props) => {
    const { removeProduct, updateQuantity } = useCartStore((state) => state)

    return (
        <div>
            <div className="w-full mb-2 border border-black flex flex-row  gap-5 p-2 md:p-0">

                {/* Imagen */}
                <div className='size-24 md:size-30 shrink-0 overflow-hidden bg-gray-200 mx-auto sm:mx-0 relative'>
                    <Image
                        src={`/images/products/${item.imagen}`}
                        alt={item.nombre}
                        fill
                        // width={120}
                        // height={120}
                        className='object-cover w-full h-full'
                    />
                </div>

                {/* Contenido */}
                <div className='w-full py-2 sm:py-4 flex flex-col gap-3'>

                    {/* Top */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-1.5 md:gap-3'>

                        {/* Nombre */}
                        <h3 className={`${textFont4.className} text-md text-gray-900 break-words`}>
                            {item.nombre}
                        </h3>

                        {/* Cantidad */}
                        <div className='hidden md:block'>
                            <QuantitySelector
                                quantity={item.cantidad}
                                onQuantityChanged={(cantidad) => updateQuantity(item.varianteId, cantidad)}
                            />
                        </div>


                        {/* Precio + eliminar */}
                        <div className='flex items-center gap-2 justify-between sm:justify-end'>
                            <p className={`text-black ${textFont3.className}`}>
                                S/ {item.precio}
                            </p>
                            <X
                                onClick={() => removeProduct(item.varianteId)}
                                strokeWidth={2}
                                className='hover:cursor-pointer'
                            />
                        </div>
                    </div>

                    {/* Info extra */}
                    <div>
                        <p className='text-sm'>Talla: {item.talla}</p>
                    </div>

                    <div className='block md:hidden'>
                        <QuantitySelector
                            quantity={item.cantidad}
                            onQuantityChanged={(cantidad) => updateQuantity(item.varianteId, cantidad)}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default CartItem