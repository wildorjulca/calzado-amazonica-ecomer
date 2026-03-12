'use server'

import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"

export const VerificarStock = async (varianteId: number, quantity: number) => {
    await sleep(2)
    try {
        const varianteProducto = await prisma.variante_producto.findFirst({
            where: {
                id: varianteId
            },
            select: {
                cantidad: true
            }
        })
        
        if (!varianteProducto?.cantidad) {
            return {
                ok: false,
                message: 'Variante de producto no encontrada'
            }
        }

        if (varianteProducto.cantidad < quantity) {
            return {
                ok: false,
                message: `Stock insuficiente. Solo quedan ${varianteProducto.cantidad ?? 0} unidades disponibles.`
            }
        }

        if(varianteProducto.cantidad??0 >= quantity){
            return {
                ok: true,
                message: 'Stock disponible'
            }
        }


    } catch (error) {
        console.error('❌ VerificarStock error:', error)
        return {
            ok: false,
            message: 'Error al verificar el stock'

        }
    }
}