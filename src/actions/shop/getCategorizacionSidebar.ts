'use server'

import { prisma } from "@/lib"
import { cache } from "react"

//
// 🔹 FUNCIONES ESTÁTICAS (CACHEADAS)
//

// 📌 Categorías con conteo
const getCategoriaCount = cache(async () => {
    const categorias = await prisma.categoria.findMany({
        where: { activo: true },
        select: {
            id: true,
            nombre: true,
            slug: true,
            subcategoria: {
                select: {
                    _count: {
                        select: {
                            producto: {
                                where: { activo: true }
                            }
                        }
                    }
                }
            }
        }
    })

    return categorias.map(c => {
        const countProduct = c.subcategoria.reduce(
            (acc, item) => acc + item._count.producto,
            0
        )

        return {
            id: c.id,
            nombre: c.nombre,
            slug: c.slug,
            count: countProduct
        }
    })
})


// 📌 Marcas (cacheado)
const getMarcas = cache(async () => {

    return prisma.marca.findMany({
        take: 12,
        select: {
            id: true,
            nombre: true,
            slug: true
        }
    })
})


//
// 🔹 FUNCIÓN DINÁMICA (NO CACHEADA)
//

const getSubcategoriasByCategory = async (categoriaSlug: string) => {


    const subcategorias = await prisma.subcategoria.findMany({
        where: {
            categoria: {
                slug: categoriaSlug
            },
            activo: true
        },
        select: {
            id: true,
            nombre: true,
            slug: true,
            _count: {
                select: {
                    producto: {
                        where: { activo: true }
                    }
                }
            }
        }
    })

    return subcategorias.map(sub => ({
        id: sub.id,
        nombre: sub.nombre,
        slug: sub.slug,
        count: sub._count.producto
    }))
}


//
// 🔹 FUNCIÓN PRINCIPAL
//

export const getCategorizacionSidebar = async (categoriaSlug: string) => {

    const [categorias, marcas, subcategorias] = await Promise.all([
        getCategoriaCount(),  // 🔥 cacheado
        getMarcas(),          // 🔥 cacheado
        getSubcategoriasByCategory(categoriaSlug) // dinámico
    ])

    return {
        categorias,
        marcas,
        subcategorias
    }
}