'use client'

import { textFont2, textFont3, textFont4 } from "@/config/fonts"
import { useCartStore } from "@/src/store"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import CartSummarySkeleton from "../skeleton/CartSummarySkeleton"
import Link from "next/link"


const OrderSumary = () => {

    // const { itemsICart, subTotal, total, tax } = useCartStore((state) =>
    //     state.getSumaryInformation()
    // )
    // const hasHydrated = useCartStore((state) => state._hasHydrated)


    const { hasHydrated, cart } = useCartStore((state) => state)

    const itemsICart = cart.reduce((acc, item) => acc + item.cantidad, 0)
    const subTotal = cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
    const tax = subTotal * 0.18
    const total = subTotal


    if (!hasHydrated) {
        return (
            <div>
                <CartSummarySkeleton />
            </div>
        )
    }

    // const { itemsICart, subTotal, total, tax } =
    //     useCartStore.getState().getSumaryInformation();
    return (
        <div className="mt-4 w-full">
            <h2 className={`${textFont2.className} text-xl  md:text-2xl font-bold tracking-widest antialiased mb-3`}>
                RESUMEN DEL PEDIDO
            </h2>
            <div className="flex w-full justify-between">
                <p className={textFont3.className}>
                    {itemsICart === 1 ? '1 producto' : `${itemsICart} productos`}
                </p>

                <p className={`${textFont3.className}`}>S/ {subTotal.toFixed(2)}</p>
            </div>
            <div className="flex  justify-between items-center">
                <p className={`${textFont3.className}`}>Entrega</p>
                <p className={`${textFont3.className} font-semibold`}>Gratis</p>
            </div>
            <div className="flex justify-between items-center mt-2.5">
                <div className="flex flex-col justify-center">
                    <p className={`${textFont4.className} font-semibold`} >Total</p>
                    <p className={`${textFont4.className} text-sm text-gray-800`}>[ IGV incluido  S/ {tax.toFixed(2)} ]</p>
                </div>
                <p className={`${textFont4.className} font-semibold`}>S/ {total.toFixed(2)}</p>
            </div>
            <div className="relative w-full mt-8">

                {/* Borde inferior separado */}
                <div className="absolute inset-0 translate-x-1 translate-y-1 border border-black"></div>
                {/* Botón principal */}
                <Link href={'/checkout-payment'}
                    className=" block
                    hover:cursor-pointer
          relative z-10
          w-full
          border border-black
          bg-black
          px-6 py-4
          text-left
          text-white
          font-semibold
          transition-colors
          hover:bg-neutral-800
        "
                >
                    <span className="flex items-center justify-between">
                        <span>Ir a pagar</span>

                        <ArrowRight
                            size={18}
                            strokeWidth={1.5}
                            className="transition-transform group-hover:translate-x-1"
                        />
                    </span>
                </Link>
            </div>
            <div className="mt-8 font-semibold">
                <p>OPCIONES DE PAGO</p>
            </div>
            <div className="flex w-full gap-1.5 items-center mt-2">
                <Image
                    src="/images/payments/visa.svg"
                    alt="Visa"
                    width={44}
                    height={28}
                />
                <Image
                    src="/images/payments/mastercard.svg"
                    alt="Visa"
                    width={44}
                    height={28}
                />
                <Image
                    src="/images/payments/american-express.svg"
                    alt="Visa"
                    width={44}
                    height={28}
                />
                <Image
                    src="/images/payments/yape.webp"
                    alt="Visa"
                    width={44}
                    height={28}
                />
            </div>

        </div>
    )
}

export default OrderSumary