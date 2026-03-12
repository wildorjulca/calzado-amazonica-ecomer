'use server'

import { prisma } from "@/lib"

export const getColores = async()=>{
    try{
        const colores = await prisma.color.findMany({
            select: {
                id: true,
                nombre: true,
                codigo_hex: true
            }
        })

        return colores
    }catch(error){
        console.log("Error de fecht de colores: ", error)
    }
}