'use client'

import { useCartStore } from "@/src/store"
import EmptyCart from "../drawer/EmptyCart"
import CartItem from "./cartItem"
import CartItemSkeleton from "../skeleton/CartItemSkeleton"
import { textFont3, textFont4 } from "@/config/fonts"

const CartList = () => {

    const { cart, hasHydrated } = useCartStore()


    if (!hasHydrated) {
        return (
            <div className="space-y-2 mt-4">
                {[...Array(2)].map((_, i) => (
                    <CartItemSkeleton key={i} />
                ))}
            </div>
        )
    }

    if (cart?.length === 0) {
        return <EmptyCart />
    }


    return (
        <div className="mt-1 md:mt-4">
            <h2 className={`${textFont4.className} text-xl md:text-2xl font-bold tracking-widest`}>
                TU CARRITO
            </h2>
            <div className='bg-gray-200 py-2.5 px-1.5 mt-4 flex flex-col border border-gray-300 mb-4'>
                <p className={`${textFont3.className} text-black font-bold`}>🚨 LOS ARTÍCULOS DE TU CARRITO NO ESTAN RESERVADOS 🚨</p>
                <p className={`${textFont3.className} text-sm`}>ASEGURALOS ANTES QUE SE AGOTEN</p>
            </div>
            {cart?.map((item) => (
                <CartItem key={item.varianteId} item={item} />
            ))}
        </div>
    )
}

export default CartList