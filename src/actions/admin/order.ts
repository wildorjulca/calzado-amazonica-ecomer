
'use server'

import { prisma } from "@/lib"


export const getOrders = async () => {
    try {
        const orders = await prisma.pedido.findMany({
            include: {
                usuario: true
            }

        })

        const formattOrders = orders.map(item => {

            const { usuario } = item

            return {
                id: item.id,
                codigo_pedido: item.codigo_pedido,
                cliente: usuario.nombre + " " + usuario.apellido,
                fecha_pedido: item.creado_en,
                total: Number(item.total),
                estado_pedido: item.estado,
                estado_pago: item.estado_pago,
            }
        })

        return {
            ok: true,
            pedidos: formattOrders
        }

    } catch (error) {
        console.log("Error al cargar los pedidos: ", error)

        return {
            ok: false,
            message: "Error al cargar los pedidos"
        }

    }
}