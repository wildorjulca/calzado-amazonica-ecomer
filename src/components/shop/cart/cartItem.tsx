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

    // const 
    return (
        <div>
            <div className=" w-full mb-2  border border-black flex  gap-5 pr-3">
                {/* <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/shopping-cart-page-04-product-01.jpg" alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." className="size-full object-cover" /> */}
                <div className='size-30 shrink-0 overflow-hidden bg-gray-200'>
                    <Image
                        src={`/images/products/${item.imagen}`}
                        alt={item.nombre}
                        width={120}
                        height={120}
                    />
                </div>

                <div className='w-full py-4'>
                    <div className='flex items-center justify-between w-full'>
                        <h3 className={`${textFont4.className} text-md text-gray-900`}>{item.nombre}</h3>
                        <QuantitySelector
                            quantity={item.cantidad}
                            onQuantityChanged={(cantidad) => updateQuantity(item.varianteId, cantidad)}
                        />
                        <div className='flex items-center gap-2'>
                            <p className={`text-black ${textFont3.className} `}>S/ {item.precio}</p>
                            <X
                                onClick={() => removeProduct(item.varianteId)}
                                strokeWidth={2}
                                className='hover:cursor-pointer'
                            />
                        </div>
                    </div>
                    <div>
                        <p>Talla: {item.talla}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem