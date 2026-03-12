'use server'

import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"

interface Props {
    producto_id: number,
    color_id: number
}
export const getProductImagesByColor = async ({ producto_id, color_id }: Props) => {
    await sleep(1)
    try {
        const imagenes = await prisma.producto_imagen.findMany({
            select: {
                url_imagen: true
            },
            where: {
                producto_id: producto_id,
                color_id: color_id
            }
        })

        return {
            ok: true,
            product_imagenes: imagenes.map((img) => img.url_imagen)
        }

    } catch (error) {
        console.error('❌ getProductsAll error:', error)
        return {
            ok: false,
            products: [],
            message: 'No se pudieron cargar los productos'
        }
    }

}