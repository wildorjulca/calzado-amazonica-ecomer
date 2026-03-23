'use client'

import { Button } from "@/components/ui/button"
import { getTallaProductByColor } from "@/src/actions/shop/product/productBySlug";
import { Color, Tallas } from "@/src/interface/product"
import { useEffect, useState } from "react"
import clsx from 'clsx'
import { useRouter, useSearchParams } from "next/navigation";
import AddToCart from "./addTo-cart";
import { inter, titleFont } from "@/config/fonts";
import { VerificarStock } from "@/src/actions/shop/product/verificaStock";
import { CartProduct, useCartStore } from "@/src/store";
import { ProductSlug } from "@/src/interface/productBySlug";

interface Props {
    productSlug: ProductSlug 
    imagenes: string[];
    productId: number;
    colores: Color[]

}
const ProductVariants = ({ productSlug, imagenes, colores, productId }: Props) => {

    const { addProduct, cart } = useCartStore((state) => state)

    const router = useRouter()
    const searchParams = useSearchParams()

    const [colorId, setcolorId] = useState<number>(colores[0].id)
    const [tallas, setTallas] = useState<Tallas[] | null>(null)
    const [selectTalla, setselectTalla] = useState<Tallas | null>(null)


    // estados de selecion de color y talla
    const [errorMessage, seterrorMessage] = useState<string | null>(null)
    const [quantity, setQuantity] = useState<number>(1)

    // estados de error  de stock de validacion y loading
    const [loadingStock, setloadingStock] = useState<boolean>(false)



    // const queryVerificarStock = useVerificarStock(selectTalla?.variante_id ?? 0, quantity)

    // console.log('queryVerificarStock:', queryVerificarStock)



    useEffect(() => {
        const loadTallas = async () => {
            setTallas(null)
            const { varianteTallas } = await getTallaProductByColor({
                productId,
                colorId,
            })

            setTallas(varianteTallas)

            const params = new URLSearchParams(searchParams)
            params.set("colorId", colorId.toString())

            router.push(`?${params.toString()}`)
        }
        loadTallas()
    }, [colorId, productId])


    const colorIdSearch = searchParams.get("colorId") || "N/A."


    const hndleColorSelect = (c: Color) => {
        setselectTalla(null)
        seterrorMessage(null)
        setQuantity(1)

        const params = new URLSearchParams(searchParams.toString());
        const isSelected = Number(colorIdSearch) === c.id

        if (isSelected) {
            params.delete("colorId")
            // router.replace()
        } else {
            params.set("colorId", String(c.id))
        }
        setcolorId(c.id)
        router.push(`?${c.id}`); // 👈 esto dispara el loading.tsx
    }

    const handleSelectTalla = (talla: Tallas) => {
        seterrorMessage(null)
        setselectTalla(talla)
    }

    const handleAddToCart = async () => {
        try {
            if (!selectTalla) {
                seterrorMessage("Debe seleccionar una talla")
                return
            }
            setloadingStock(true)
            const response = await VerificarStock(selectTalla.variante_id, quantity)
            console.log('VerificarStock response:', response)
            if (!response?.ok) {
                seterrorMessage(response?.message || "No hay suficiente stock")
                return
            }

            // const verificarStock 
            const valorColor_hex = colores.find(c => c.id === Number(colorIdSearch))?.codigo_hex || ""

            const cartItem: CartProduct = {
                varianteId: selectTalla.variante_id,
                nombre: productSlug.nombre,
                precio: productSlug.precio_base_venta,
                porcentaje_descuento: productSlug.porcentaje_descuento,
                precio_descuento: productSlug.precio_descuento,
                en_oferta: productSlug.en_oferta,
                cantidad: quantity,
                imagen: imagenes[0],
                color: valorColor_hex,
                talla: selectTalla.talla_valor
            }
            addProduct(cartItem)
        } catch (error) {
            console.error('Error al agregar al carrito:', error)
            seterrorMessage("Error al agregar al carrito")

        } finally {
            setloadingStock(false)
        }
    }


    const onValueQuantityChanged = (value: number) => {

        if (!selectTalla) {
            seterrorMessage("Debe seleccionar una talla")
            return
        }
        const updatedQuantity = quantity + value

        if (updatedQuantity < 1) return
        setQuantity(updatedQuantity)


    }

    return (
        <>
            <h3 className="font-bold mb-4">Colores disponibles</h3>
            <div className="flex gap-2">
                {colores.map((c) => (
                    <div key={c.id} className="flex flex-col items-center">
                        <button
                            onClick={() => hndleColorSelect(c)}
                            className="w-10 h-10 rounded-sm"
                            style={{ backgroundColor: c.codigo_hex || "" }}
                        />
                        <span
                            className={clsx(
                                "mt-1 h-[2px] w-full transition-opacity",
                                c.id === colorId ? "bg-black opacity-100" : "opacity-0"
                            )}
                        />
                    </div>
                ))}
            </div>

            <h3 className="font-bold mb-4 mt-4">Tallas diponibles</h3>
            <div className="flex  flex-wrap items-center gap-2 mb-4">
                {tallas?.map((t, index) => (
                    <Button key={index}
                        onClick={() => handleSelectTalla(t)}
                        variant={t.variante_id === selectTalla?.variante_id ? "default" : "outline"}
                        className="hover:cursor-pointer rounded-none hover:transition-colors">
                        {t.talla_valor}
                    </Button>
                ))}
            </div>
            {errorMessage && (
                <p className={`${inter.className} antialiased text-red-600 mb-4 text-md`}>{errorMessage}</p>
            )}
            <div className="my-4 w-full">
                <AddToCart
                    loadingStock={loadingStock}
                    quantity={quantity}
                    onValueQuantityChanged={onValueQuantityChanged}
                    handleAddToCart={handleAddToCart}
                />
            </div>
        </>

    )
}

export default ProductVariants