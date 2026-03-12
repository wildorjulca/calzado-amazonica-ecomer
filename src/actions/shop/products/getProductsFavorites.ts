'use server'

import { auth } from "@/auth"
import { Prisma } from "@/generated/prisma/browser"
import { prisma } from "@/lib"



export const getProductsFavorites = async (idUsuario: number) => {

    try {

        const favorites = await prisma.wishlist.findMany({
            include: {
                producto: {
                    include: {
                        producto_imagen: true,
                        variante_producto: {
                            include: {
                                color: true
                            }
                        }
                    }
                }
            },
            where: {
                usuario_id: idUsuario
            }
        })

        return {
            ok: true,
            products: favorites.map((f) => {

                const { producto } = f

                // 1️⃣ Colores únicos
                const coloresMap = new Map()
                producto.variante_producto.forEach((v) => {
                    coloresMap.set(v.color.id, v.color)
                })
                const colores = Array.from(coloresMap.values())

                // 2️⃣ Color por defecto (primero)
                const colorDefault = colores[0]

                // 3️⃣ Imágenes SOLO de ese color
                const imagenes = producto.producto_imagen
                    .filter((img) => img.color_id == colorDefault.id)
                    .map((img) => img.url_imagen)

                // const isFavorite = userId ? producto.wishlist.length > 0 : false

                return {
                    id: producto.id,
                    nombre: producto.nombre,
                    slug: producto.slug,
                    descripcion: producto.descripcion,
                    precio_base_venta: Number(producto.precio_base_venta),
                    precio_descuento: Number(producto.precio_descuento),
                    porcentaje_descuento: Number(producto.porcentaje_descuento),
                    en_oferta: producto.en_oferta,
                    colores,
                    color_default: colorDefault, // 👈 importante
                    producto_imagen: imagenes,   // 👈 SOLO imágenes del color default
                    isFavorite: true
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