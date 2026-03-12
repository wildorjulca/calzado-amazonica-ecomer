'use server'

import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"

export const getProvinciasByRegionId = async (region_id?: number) => {

    await sleep(1)
    
    try {
        const provincia = await prisma.provincia.findMany({
            select: {
                id: true,
                nombre: true
            },
            where: {
                region_id: region_id
            }
        })


        return provincia
    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Error de fecht de provincias")

    }
}