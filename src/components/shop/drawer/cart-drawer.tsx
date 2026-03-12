'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { useCartStore } from "@/src/store"
import clsx from "clsx"
import { Lock, ShoppingBagIcon, X } from "lucide-react"
import EmptyCart from "./EmptyCart"
import SingleItem from "./SingleItem"
import Link from "next/link"

export function CartDrawer() {
    // Estado del carrito
    const { cart, hasHydrated } = useCartStore()

    const lineCount = cart.reduce((acc, item) => acc + item.cantidad, 0)


    if (!hasHydrated) {
        return (
            <div className="flex items-center justify-center">
                <p>Cargando...</p>

            </div>

        )
    }

    return (
        <Drawer direction="right">
            {/* Trigger del Drawer */}
            <DrawerTrigger asChild>
                <div className="relative flex items-center hover:cursor-pointer">
                    <ShoppingBagIcon className="h-7 w-7 shrink-0" aria-hidden="true" />

                    {/* Badge del carrito */}
                    {lineCount > 0 ? (
                        <div
                            className={clsx(
                                "absolute bottom-0 right-0 -mb-2 -mr-2 flex h-4 items-center justify-center rounded bg-neutral-900 text-xs font-medium text-white",
                                lineCount > 9 ? "w-[3ch]" : "w-[2ch]"
                            )}
                        >
                            {lineCount}
                            <span className="sr-only">
                                item{lineCount > 1 ? "s" : ""} in cart, view bag
                            </span>
                        </div>
                    ) : (
                        <span className="sr-only">0 items in cart</span>
                    )}
                </div>
            </DrawerTrigger>

            {/* Contenido del Drawer */}
            <DrawerContent>
                <DrawerHeader>
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <DrawerTitle>Carrito de compras</DrawerTitle>
                            <DrawerDescription>Tus productos elegidos.</DrawerDescription>
                        </div>
                        <DrawerClose asChild>
                            <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
                                <X />
                            </Button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                {/* Lista de productos o carrito vacío */}
                {cart?.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <div className="no-scrollbar overflow-y-auto px-4 flex flex-col gap-4">
                            {cart?.map((p) => (
                                <SingleItem key={p.varianteId} product={p} />
                            ))}
                        </div>

                        <DrawerFooter className="border-t pt-4">
                            {/* Total estimado */}
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-semibold uppercase text-gray-800">
                                        Total estimado
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        Incluye IGV
                                    </span>
                                </div>
                                <p className="text-xl font-bold text-gray-900">
                                    S/ 250.00
                                </p>
                            </div>

                            {/* Botón Proceder al pago */}
                            <Link href={"/checkout-payment"} className="h-12 bg-gray-800 hover:bg-gray-900 text-white w-full text-base font-semibold flex items-center justify-center gap-2">
                                <Lock className="h-4 w-4" />
                                Proceder al pago
                            </Link>

                            {/* Botón Ver carrito */}
                            <Link href={'/cart'}
                                className="w-full bg-neutral-200 mt-2 text-black text-center py-2.5 transition-all hover:bg-neutral-300"
                            >
                                Ver carrito
                            </Link>
                        </DrawerFooter>
                    </>
                )}
            </DrawerContent>
        </Drawer>
    )
}