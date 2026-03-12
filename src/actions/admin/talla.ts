
'use server'

import { prisma } from "@/lib"

export const getTallas = async()=>{
    try {
        const tallas = await prisma.talla.findMany({
            select: {
                id: true,
                valor: true
                
            }
        })
        return tallas
    } catch (error) {
        console.log("Error de fecht de Tallas: ", error)
    }
}