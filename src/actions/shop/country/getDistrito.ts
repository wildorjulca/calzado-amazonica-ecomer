'use server'

import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"

export const getDistritoByProvinciaId = async (provincia_id?: number) => {
    await sleep(1)
    try {
        const distritos = await prisma.distrito.findMany({
            select: {
                id: true,
                nombre: true
            },
            where: {
                provincia_id: provincia_id
            }
        })

        return distritos

    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Error de fecht de distritos")
    }
}