
'use server'

import { prisma } from "@/lib"

interface Props {
    slug: string
}

export const getProductBySlug = async ({ slug }: Props) => {

    try {
        const product = await prisma.producto.findFirst({
            where: { slug: slug },
            select: {
                id: true,
                nombre: true,
                slug: true,
                descripcion: true,
                precio_base_venta: true,
                precio_descuento: true,
                porcentaje_descuento: true,
                en_oferta: true,
                producto_imagen: {
                    select: {
                        id: true,
                        url_imagen: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                slug: true,
                                codigo_hex: true,
                            }


                        }
                    }
                },
                variante_producto: {
                    select: {
                        precio_extra: true,
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true
                            },
                        },
                        talla: {
                            select: { id: true, valor: true }
                        }
                    }
                }
            }
        })


        const coloresDisponibles = Array.from(new Map(
            product?.variante_producto.map(v => [v.color.id, v.color])
        ).values())

        return {
            ok: true,
            product: {
                id: product?.id,
                nombre: product?.nombre,
                slug: product?.slug,
                descripcion: product?.descripcion,
                precio_base_venta: Number(product?.precio_base_venta),
                precio_descuento: Number(product?.precio_descuento),
                porcentaje_descuento: Number(product?.porcentaje_descuento),
                en_oferta: product?.en_oferta,
                coloresDisponibles: coloresDisponibles
            },

        }

    } catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            product: {},
            message: "Error enel fech de product slug"
        }

    }
}

interface PropsTallasByColor {
    productId: number,
    colorId: number
}

interface PropsImagesByColor {
    productId: number
    colorId: number
}
export const getImagesProductByColor = async ({ productId, colorId }: PropsImagesByColor) => {
    try {
        const images = await prisma.producto_imagen.findMany({
            where: { producto_id: productId, color_id: colorId },
            select: {
                url_imagen: true
            }
        })
        const imagenesMap = images.map((img) => img.url_imagen)

        return {
            ok: true,
            imagenes: imagenesMap
        }

    } catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            imagenes: [],
            message: error
        }
    }
}

export const getTallaProductByColor = async ({ productId, colorId }: PropsTallasByColor) => {
    try {
        const tallas = await prisma.variante_producto.findMany({
            where: { producto_id: productId, color_id: colorId },
            select: {
                id: true,
                cantidad: true,
                precio_extra: true,
                talla: {
                    select: {
                        id: true,
                        valor: true
                    }
                }
            }
        })

        const varianteTallas = tallas.map(v => ({
            variante_id: v.id,
            talla_id: v.talla.id,
            talla_valor: v.talla.valor,
            precio_extra: Number(v.precio_extra),
            stock: v.cantidad
        }))
        return {
            ok: true,
            varianteTallas: varianteTallas
        }


    } catch (error) {
        console.log("Error: ", error)
        return {
            ok: false,
            varianteTallas: [],
            message: error
        }
    }
}