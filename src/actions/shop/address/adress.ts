
'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib"
import { sleep } from "@/lib/sleep"
import { redirect } from "next/navigation"

export const getUsersListAddress = async (usuarioId: number) => {

    try {
        const adressUser = await prisma.direccion_envio.findMany({
            where: { usuario_id: usuarioId },
            select: {
                id: true,
                nombres: true,
                apellidos: true,
                referencia: true,
                telefono: true,
                es_principal: true,
                distrito: {
                    select: {
                        id: true,
                        nombre: true,
                        provincia: {
                            select: {
                                id: true,
                                nombre: true,
                                region: {
                                    select: {
                                        id: true,
                                        nombre: true,
                                    }
                                }

                            },
                        }
                    }
                }
            }
        })
        const address = adressUser.map((item) => ({
            id: item.id,
            nombres: item.nombres,
            apellidos: item.apellidos,
            referencia: item.referencia,
            telefono: item.telefono,
            es_principal: item.es_principal ?? false,
            region: {
                id: item.distrito.provincia.region.id,
                nombre: item.distrito.provincia.region.nombre,
            },
            provincia: {
                id: item.distrito.provincia.id,
                nombre: item.distrito.provincia.nombre
            },
            distrito: {
                id: item.distrito.id,
                nombre: item.distrito.nombre

            }

        }))
        return address

    } catch (error) {
        console.log("Error: ", error)
        throw new Error("Error de fecht de direcciones del Usuario")

    }
}

interface Direccion {
    nombres: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    distrito_id: number;
    referencia?: string;
    es_principal: boolean;

}
export const saveAddresUser = async (direcion_envio: Direccion) => {

    await sleep(2)

    const session = await auth()
    console.log(session?.user?.id)

    if (!session?.user) {
        redirect("/login?redirectTo=/checkout-payment");
    }

    const usuario_id = Number(session.user.id)

    try {

        if (direcion_envio.es_principal) {
            await prisma.direccion_envio.updateMany({
                data: { es_principal: false },
                where: {
                    usuario_id: usuario_id
                }
            })
            const address = await prisma.direccion_envio.create({
                data: {
                    ...direcion_envio,
                    usuario_id: usuario_id
                },
                select: {
                    id: true,
                    nombres: true,
                    apellidos: true,
                    referencia: true,
                    telefono: true,
                    es_principal: true,
                    distrito: {
                        select: {
                            id: true,
                            nombre: true,
                            provincia: {
                                select: {
                                    id: true,
                                    nombre: true,
                                    region: {
                                        select: {
                                            id: true,
                                            nombre: true,
                                        }
                                    }

                                },
                            }
                        }
                    }
                }
            })
            const addresObj = {
                id: address.id,
                nombres: address.nombres,
                apellidos: address.apellidos,
                referencia: address.referencia,
                telefono: address.telefono,
                es_principal: address.es_principal ?? false,
                region: {
                    id: address.distrito.provincia.region.id,
                    nombre: address.distrito.provincia.region.nombre,
                },
                provincia: {
                    id: address.distrito.provincia.id,
                    nombre: address.distrito.provincia.nombre
                },
                distrito: {
                    id: address.distrito.id,
                    nombre: address.distrito.nombre

                }
            }
            return addresObj

        } else {

            const address = await prisma.direccion_envio.create({
                data: {
                    ...direcion_envio,
                    usuario_id: usuario_id
                },
                select: {
                    id: true,
                    nombres: true,
                    apellidos: true,
                    referencia: true,
                    telefono: true,
                    es_principal: true,
                    distrito: {
                        select: {
                            id: true,
                            nombre: true,
                            provincia: {
                                select: {
                                    id: true,
                                    nombre: true,
                                    region: {
                                        select: {
                                            id: true,
                                            nombre: true,
                                        }
                                    }

                                },
                            }
                        }
                    }
                }
            })

            const addresObj = {
                id: address.id,
                nombres: address.nombres,
                apellidos: address.apellidos,
                referencia: address.referencia,
                telefono: address.telefono,
                es_principal: address.es_principal ?? false,
                region: {
                    id: address.distrito.provincia.region.id,
                    nombre: address.distrito.provincia.region.nombre,
                },
                provincia: {
                    id: address.distrito.provincia.id,
                    nombre: address.distrito.provincia.nombre
                },
                distrito: {
                    id: address.distrito.id,
                    nombre: address.distrito.nombre

                }
            }
            return addresObj
        }


    } catch (error) {
        console.log(error)
        throw new Error("Error al guardar la direccion de envio del usuario")
        // return {
        //     ok: false,
        //     message: "No se pudo guardar la direccion", error
        // }
    }


}