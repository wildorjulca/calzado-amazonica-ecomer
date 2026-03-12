'use server'

import { auth } from "@/auth"
import { Prisma } from "@/generated/prisma/browser"
import { prisma } from "@/lib"

interface Props {
    query?: string
}


export const getProductsAll = async ({ query }: Props) => {

    const session = await auth()
    const userId = Number(session?.user?.id)

    const where: Prisma.productoWhereInput = {
        activo: true,
    }

    if (query) {
        where.nombre = {
            contains: query,
        }
    }
    try {
        const products = await prisma.producto.findMany({
            select: {
                id: true,
                nombre: true,
                slug: true,
                descripcion: true,
                precio_base_venta: true,
                precio_descuento: true,
                porcentaje_descuento: true,
                en_oferta: true,
                // imagenes,
                producto_imagen: {
                    select: {
                        color_id: true,
                        url_imagen: true,
                    }
                },
                variante_producto: {
                    select: {
                        color: {
                            select: {
                                id: true,
                                nombre: true,
                                codigo_hex: true
                            }
                        }
                    }
                },
                wishlist: userId ?
                    {
                        where:
                            { usuario_id: userId },
                        select: { id: true }
                    } : false
            },

            where: where,
            orderBy: {
                id: "desc"
            }
        })


        return {
            ok: true,
            products: products.map((p) => {

                // 1️⃣ Colores únicos
                const coloresMap = new Map()
                p.variante_producto.forEach((v) => {
                    coloresMap.set(v.color.id, v.color)
                })
                const colores = Array.from(coloresMap.values())

                // 2️⃣ Color por defecto (primero)
                const colorDefault = colores[0]

                // 3️⃣ Imágenes SOLO de ese color
                const imagenes = p.producto_imagen
                    .filter((img) => img.color_id == colorDefault.id)
                    .map((img) => img.url_imagen)

                const isFavorite = userId ? p.wishlist.length > 0 : false

                return {
                    id: p.id,
                    nombre: p.nombre,
                    slug: p.slug,
                    descripcion: p.descripcion,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento),
                    porcentaje_descuento: Number(p.porcentaje_descuento),
                    en_oferta: p.en_oferta,
                    colores,
                    color_default: colorDefault, // 👈 importante
                    producto_imagen: imagenes,   // 👈 SOLO imágenes del color default
                    isFavorite
                }
            }),
        }

        

    } catch (error) {
        console.error('❌ getProductsAll error:', error)
        return {
            ok: false,
            products: [],
            message: 'No se pudieron cargar los productos'
        }

    }
}