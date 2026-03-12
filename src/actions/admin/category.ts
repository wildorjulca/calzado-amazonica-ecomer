'use server'

import { prisma } from "@/lib"


export const getCategorias = async () => {
    try {
        const categorias = await prisma.categoria.findMany({
            select: {
                id: true,
                nombre: true,
            }
        })
        return categorias

    } catch (error) {
        console.log("Error al cargar las Categorias")
    }
}

//  traer las subcategorias relacioandas con la categoria
export const getSubcategoriasPorCategoriaId = async (categoriaId: number) => {
    try {
        const subcategoria = await prisma.subcategoria.findMany({
            where: { categoria_id: categoriaId },
            select: {
                id: true,
                nombre: true
            }
        })

        return subcategoria

    } catch (error) {
        console.log("Error al obtener las subcategorias de la categoria", error)
    }

} 