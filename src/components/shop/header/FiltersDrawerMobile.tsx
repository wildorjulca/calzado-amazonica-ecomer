'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Menu, SearchIcon, X } from "lucide-react"
import Link from "next/link"

export function FiltersDrawerMobile() {
    const [isOpen, setIsOpen] = useState(false)

    const categories = [
        { name: "Zapatillas", href: "/category/zapatillas" },
        { name: "Zapatos", href: "/category/zapatos" },
        { name: "Botines y Botas", href: "/category/botines-y-botas" },
        { name: "Sandalias", href: "/category/sandalias" },
    ]

    return (
        <Drawer
            direction="top"
            open={isOpen}
            onOpenChange={setIsOpen}
        >
            {/* BOTÓN PARA ABRIR DRAWER */}
            <DrawerTrigger asChild>
                {/* <Button
                    variant="outline"
                    className="rounded-full shadow-sm border-gray-300 hover:bg-gray-100"
                > */}
                <Menu className="h-7 w-7 shrink-0" aria-hidden="true" />
                {/* </Button> */}
            </DrawerTrigger>

            {/* CONTENIDO DEL DRAWER */}
            <DrawerContent className="overflow-y-auto space-y-4 max-h-[60vh] pt-4">

                {/* BOTÓN CERRAR (X) */}
                <DrawerClose asChild>
                    <button className="absolute right-2 top-2 z-50 flex  items-center justify-center ">
                        <X className="w-4 h-4 text-black" />
                    </button>
                </DrawerClose>

                {/* CONTENIDO INTERNO */}
                <div className="overflow-y-auto space-y-6 px-4 pb-6 mt-4">

                    {/* BUSCADOR */}
                    <form className="group relative w-full">
                        <input
                            type="text"
                            name="search"
                            placeholder="Buscar productos"
                            autoComplete="on"
                            required
                            className="h-11 w-full rounded-full border border-gray-300 bg-white px-5 pr-12 text-sm text-black placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black transition"
                        />
                        <button
                            type="submit"
                            className="absolute right-1 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white shadow-md hover:scale-105 transition"
                        >
                            <SearchIcon className="h-4 w-4" />
                        </button>
                    </form>

                    {/* SECCIÓN DE CATEGORÍAS */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                            Categorías
                        </h3>
                        <div className="flex flex-col gap-2">
                            {categories.map((category) => (
                                <Link
                                    key={category.name}
                                    href={category.href}
                                    onClick={() => setIsOpen(false)} // cierra drawer al navegar
                                    className="text-gray-700 hover:text-black hover:underline transition py-1"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ENLACE A FAVORITOS */}
                    <div className="bg-black rounded-2xl py-2 text-center">
                        <Link
                            href={"/listFavorites"}
                            onClick={() => setIsOpen(false)} // cierra drawer al navegar
                            className="text-slate-100  hover:underline transition text-sm"
                        >
                            Ver mis productos favoritos ❤️
                        </Link>
                    </div>

                </div>

            </DrawerContent>
        </Drawer>
    )
}