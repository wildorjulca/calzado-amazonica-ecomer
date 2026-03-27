'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib"

export const getPedidosUser = async () => {

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
                    take: 1,
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
                },
                _count: {
                    select: {
                        detalle_pedido: true
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
                total: Number(item.total),
                items: item._count.detalle_pedido,
                estado: item.estado,
                estado_pago: item.estado_pago,
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
export const getDetallePedido = async (codigo_pedido: string) => {

    try {

        const pedido = await prisma.pedido.findUnique({
            where: {
                codigo_pedido: codigo_pedido
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
                },
                direccion_envio: {
                    include: {
                        distrito: {
                            include: {
                                provincia: {
                                    include: {
                                        region: true
                                    }
                                }
                            }
                        }
                    }
                },
                usuario: true
            }
        })

        if (!pedido) {
            return {
                ok: false,
                message: "Pedido no encontrado"
            }
        }


        const direccion = pedido.direccion_envio

        const distrito = direccion?.distrito?.nombre
        const provincia = direccion?.distrito?.provincia?.nombre
        const region = direccion?.distrito?.provincia?.region?.nombre

        const formattedPedidoDetails = {
            id: pedido.id,
            subtotal: Number(pedido.subtotal),
            total: Number(pedido.subtotal),
            codigo: pedido.codigo_pedido,
            fecha: pedido.creado_en,
            estado: pedido.estado,
            estado_pago: pedido.estado_pago,
            direccion: {
                nombreCompleto: `${direccion?.nombres ?? ''} ${direccion?.apellidos ?? ''}`.trim(),
                telefono: direccion?.telefono,
                direccion: direccion?.direccion,
                distrito: distrito,
                provincia: provincia,
                region: region,
            },

            items: pedido.detalle_pedido.map((det) => {
                const { variante_producto } = det
                const { producto } = variante_producto

                return {
                    id: variante_producto.id,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    imagen: producto.producto_imagen[0]?.url_imagen,
                    cantidad: det.cantidad,
                    precio: Number(det.precio_unitario),
                    subtotal: Number(det.subtotal),
                    talla: variante_producto.talla.valor,
                    color: variante_producto.color.nombre
                }
            })
        }

        return {
            ok: true,
            detalle_pedido: formattedPedidoDetails
        }

    } catch (error) {
        console.log(error)
        return {
            ok: false,
            message: "Error al obtener el detalle del pedido"
        }
    }
}