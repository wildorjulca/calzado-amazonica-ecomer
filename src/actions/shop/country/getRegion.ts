'use server'

import { prisma } from "@/lib"

export const getRegion = async()=>{
    try {
        const region = await prisma.region.findMany({
            select: {
                id: true,
                nombre: true
            }
        })
        return region
        
    } catch (error) {
        console.log("Error:", error)
        throw new Error("Error de fecht de Regiones")
    }
}