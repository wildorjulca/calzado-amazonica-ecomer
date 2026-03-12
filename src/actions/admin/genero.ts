
'use server'

import { prisma } from "@/lib"

export const getGeneros = async () => {
    try {
        const generos = await prisma.genero_producto.findMany({
            select: {
                id: true,
                nombre: true
            }
        })

        return generos

    } catch (error) {
        console.log("Error de fecht de Genero: ", error)
    }
}