'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib"

export const getPedidosUser = async () => {

    // await sleep(1)

    const session = await auth()

    if (!session?.user.id) {
        return {
            ok: false,
            message: "No a iniciado Session aun"
        }
    }

    const usuarioId = Number(session.user.id)

    try {

        const orders = await prisma.pedido.findMany({
            where: {
                usuario_id: usuarioId
            },
            include: {
                detalle_pedido: {
                    include: {
                        variante_producto: {
                            include: {
                                talla: true,
                                color: true,
                                producto: {
                                    include: {
                                        producto_imagen: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                id: "desc"
            }

        })

        const formattedOrder = orders.map((item) => {


            return {
                id: item.id,
                codigo_pedido: item.codigo_pedido,
                fecha: item.creado_en!,
                total: item.total,
                item: item.detalle_pedido.map((det) => {
                    const { variante_producto } = det
                    const { producto } = variante_producto

                    return {
                        nombre: producto.nombre,
                        descripcion: producto.descripcion,
                        url_imagen: producto.producto_imagen[0].url_imagen,
                        cantidad: det.cantidad,
                        subtotal: Number(det.subtotal),
                        talla: variante_producto.color.nombre,
                        color: variante_producto.color.nombre
                    }
                })
            }
        })

        return {
            ok: true,
            orders: formattedOrder
        }

    } catch (error) {
        console.log("Error en getPedidosUser: ", error)
        return {
            ok: false,
            message: "Ocurrió un error al obtener tus pedidos. Intenta nuevamente."
        }
    }

}