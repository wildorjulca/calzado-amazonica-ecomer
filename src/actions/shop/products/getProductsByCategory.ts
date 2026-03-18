'use server'

import { auth } from "@/auth"
import { Prisma } from "@/generated/prisma/browser"
import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"
import { revalidatePath } from "next/cache"


interface Props {
    page?: number;
    take?: number;

    categorySlug: string,
    subcategory?: string,
    marca?: string;
    orderBy?: string
    // orderBy?:
    // | "OrderByNameASC"
    // | "OrderByNameDESC"
    // | "OrderByPriceASC"
    // | "OrderByPriceDESC",
    minPrice?: number,
    maxPrice?: number
}

export const getProductsByCategory = async ({ page = 1, take = 6, categorySlug, subcategory, marca, orderBy }: Props) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1


    const session = await auth()
    const userId = Number(session?.user?.id)



    try {
        const where: Prisma.productoWhereInput = {
            activo: true,
            subcategoria: {
                categoria: {
                    slug: categorySlug,
                },
            },
        }

        if (subcategory) {
            where.subcategoria = {
                slug: subcategory,
                categoria: {
                    slug: categorySlug,
                },
            }
        }
        if (marca) {
            where.marca = {
                slug: marca
            }
        }


        // 2️⃣ ORDER BY
        let orderByClause: Prisma.productoOrderByWithRelationInput = {}

        switch (orderBy) {
            case "OrderByNameASC":
                orderByClause = { nombre: "asc" }
                break
            case "OrderByNameDESC":
                orderByClause = { nombre: "desc" }
                break
            case "OrderByPriceASC":
                orderByClause = { precio_base_venta: "asc" }
                break
            case "OrderByPriceDESC":
                orderByClause = { precio_base_venta: "desc" }
                break
            default:
                orderByClause = { nombre: "asc" }
        }

        const products = await prisma.producto.findMany({
            skip: (page - 1) * take,
            take: take,
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
            orderBy: orderByClause,
        })

        const totalCount = await prisma.producto.count({ where });
        const totalPages = Math.ceil(totalCount / take);



        return {

            ok: true,
            products: products.map((p) => {


                // 🔥 quitar colores duplicados
                const coloresMap = new Map()

                p.variante_producto.forEach((v) => {
                    coloresMap.set(v.color.id, v.color)
                })
                const colores = Array.from(coloresMap.values())

                // color por defcto primero
                const colorDefault = colores[0]

                // Images de esa color del primer elemrnto de la color
                const imagenes = p.producto_imagen
                    .filter((img) => img.color_id == colorDefault.id)
                    .map((img) => img.url_imagen)

                const isFavorite = userId ? p.wishlist.length > 0 : false

                return {
                    ...p,
                    precio_base_venta: Number(p.precio_base_venta),
                    precio_descuento: Number(p.precio_descuento),
                    porcentaje_descuento: Number(p.porcentaje_descuento),
                    colores: colores,

                    color_default: colorDefault, // 👈 importante
                    producto_imagen: imagenes,   // 👈 SOLO imágenes del color default
                    isFavorite
                }

            }),
            pagination: {
                currentPage: page,
                totalPages,
                totalCount,
            }
        }
    } catch (error) {
        console.error('❌ getProductsCategory error:', error)
        return {
            ok: false,
            products: [],
            message: "Failed to load products",
        }
    }
}
