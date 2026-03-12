'use server'

import { prisma } from "@/lib"

export const getMarcas = async () => {
    try {
        const marcas = await prisma.marca.findMany({
            select: {
                id: true,
                nombre: true
            }
        })

        return marcas
        
    } catch (error) {
        console.log("Error de fecht de marcas: ", error)
    }
}