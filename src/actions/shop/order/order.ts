'use server'

import { prisma } from "@/lib"

export const getOrderById = async (orderId: number) => {
    try {

        const order = await prisma.pedido.findUnique({
            where: { id: orderId },
            include: {
                detalle_pedido: {
                    include: {
                        variante_producto: {
                            include: {
                                color: true,
                                talla: true,
                                producto: {
                                    include: {
                                        producto_imagen: true
                                    }
                                }
                            }
                        },
                    }
                }
            }
        })


        if (!order) {
            throw new Error("No se econtro la orden con  el id proporcioanado")
        }

        // // 🔥 Transformamos la respuesta limpia

        const formattedOrder = {
            id: order.id,
            codido_pedido: order.codigo_pedido,
            estado_pedido: order.estado,
            estado_pago: order.estado_pago,
            metodo_pago: order.metodo_pago,
            total: Number(order.total),
            items: order.detalle_pedido.map((item => {

                const { variante_producto } = item
                const { producto } = variante_producto
                return {
                    id: item.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion ?? "",
                    subtotal: Number(item.subtotal),
                    cantidad: item.cantidad,
                    color: variante_producto.color.nombre,
                    talla: variante_producto.talla.valor,
                    img: producto.producto_imagen[0].url_imagen

                }
            }))

        }



        return {
            ok: true,
            pedido: formattedOrder
        }


        // if (!order) return null

        // // 🔥 Transformamos la respuesta limpia
        // const formattedOrder = {
        //   id: order.id,
        //   codigo: order.codigo_pedido,
        //   estado: order.estado,
        //   total: order.total,

        //   items: order.detalle_pedido.map((item) => {

        //     const { variante_producto } = item
        //     const { producto } = variante_producto

        //     // ✅ Buscar imagen correcta por color
        //     const imagen = producto.producto_imagen.find(
        //       img =>
        //         img.color_id === variante_producto.color_id &&
        //         img.es_principal
        //     )

        //     return {
        //       cantidad: item.cantidad,
        //       subtotal: item.subtotal,

        //       producto: producto.nombre,
        //       color: variante_producto.color.nombre,
        //       talla: variante_producto.talla.valor,

        //       imagen: imagen?.url_imagen ?? null
        //     }
        //   })
        // }

        // return formattedOrder

    } catch (error) {
        console.error(error)
        return null
    }
}