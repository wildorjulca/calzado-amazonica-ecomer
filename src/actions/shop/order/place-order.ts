'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep";

type ProductMap = {
    productId: number;
    varianteId: number;
    stock: number;
    precio_final: number
}

type AddressUser = {
    nombres: string
    apellidos: string
    telefono: string
    direccion: string
    distrito_id: number
    referencia?: string
    es_principal?: boolean
}

type ProductId = {
    variante_id: number;
    cantidad: number;

}

// !!  falta el addressUser  como argumento 👇
export const placeToOrder = async (addressUser: AddressUser, productId: ProductId[]) => {

    await sleep(1)

    // 01 verificar si el usaurio esta autenticado 
    const session = await auth()
    const userId = Number(session?.user.id)

    if (!userId) {
        return {
            ok: false,
            message: "Haun no a iniciado Session."
        }
    }
    // 02 Obtener lo precios Actulizados  de os ProductId

    const products = await prisma.variante_producto.findMany({
        where: {
            id: {
                in: productId.map((p) => p.variante_id)
            },
        },
        include: {
            producto: {
                select: {
                    id: true, precio_base_venta: true, precio_descuento: true, porcentaje_descuento: true
                }
            }
        }
    })

    // 03 Crerar el emcabezado de la orden ( Subtotal, tax, total, items)
    const itemCount = productId.reduce((acc, item) => acc + item.cantidad, 0)

    //!! asemos un map con precio actulizados  y lo agregamos a un solo array para hacer calculos
    const productMap: ProductMap[] = []
    for (const variante of products) {
        const stock = variante.cantidad ?? 0
        const precio_extra = Number(variante.precio_extra ?? 0)
        const precio_base_venta = Number(variante.producto.precio_base_venta)
        const precio_desc = Number(variante.producto.precio_descuento ?? 0)

        const precio_final = precio_desc ? (precio_desc + precio_extra) : (precio_base_venta + precio_extra)

        productMap.push({
            productId: variante.producto_id,
            varianteId: variante.id,
            stock: stock,
            precio_final,
        })

    }

    let subtotal = 0;
    let tax = 0;
    let total = 0;

    productMap.forEach(item => {
        const quantity = productId.find((i) => i.variante_id === item.varianteId)?.cantidad ?? 0
        subtotal += (item.precio_final * quantity)

    });

    tax = subtotal * 0.18
    total = subtotal + tax

    try {

        const prismaTx = await prisma.$transaction(async (tx) => {

            // actulizamos el stock de os productos con su varinate !!Respectiva
            //!!Validar y descontar stock
            for (const item of productId) {
                const productVar = productMap.find((p) => p.varianteId === item.variante_id)

                if (!productVar) {
                    throw new Error("Producto no encontrado")
                }

                if (productVar.stock < item.cantidad) {
                    throw new Error(`Stock induficiente para la variante: ${item.variante_id}`)
                }

                await tx.variante_producto.update({
                    data: {
                        cantidad: {
                            decrement: item.cantidad
                        }
                    },
                    where: { id: item.variante_id }
                })
            }

            //  agregamos la direccion del pedido
            const address = await tx.direccion_envio.create({
                data: {
                    ...addressUser,
                    usuario_id: userId
                }
            })
            // Agregamos el pedido
            const order = await tx.pedido.create({
                data: {
                    codigo_pedido: `PED-${Date.now()}`,
                    usuario_id: Number(userId),
                    direccion_envio_id: address.id,
                    subtotal: subtotal,
                    igv: tax,
                    total: total,
                    detalle_pedido: {
                        createMany: {
                            data: productId.map((item) => {

                                const product = productMap.find((p) => p.varianteId === item.variante_id)

                                if (!product) {
                                    throw new Error("Producto no encontrado en el detalle del pedido")
                                }
                                return {
                                    variante_id: product.varianteId,
                                    cantidad: item.cantidad,
                                    producto_id: product.productId,
                                    precio_unitario: product.precio_final,
                                    subtotal: product.precio_final * item.cantidad
                                }
                            })
                        }
                    }
                }
            })

            return {
                order
            }
        })

        return {
            ok: true,
            message: "Pedido creado correctamente.",
            orden: prismaTx.order
        }
    } catch (error) {
        return {
            ok: false,
            message: error instanceof Error ? error.message : "Error desconocido"
        }

    }

}