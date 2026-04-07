'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Percent, Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import ModalAplicarDescuento from "./modal-aplicar-descuento";
import { Product } from "../interface/product.type";
interface ProductActionsProps {
    product: Product
    estado: {
        en_oferta: boolean;
        es_nuevo: boolean


    }
}

export default function MenutAcciones({
    product,
    estado

}: ProductActionsProps) {


    const [isOpenAplicarDesc, setisOpenAplicarDesc] = useState(false)




    const handleAplicarDescuento = () => {

    }


    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-56">

                    {/* ================= GESTIÓN ================= */}
                    <DropdownMenuLabel>Gestión</DropdownMenuLabel>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}`}>
                            Ver detalle
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/editar/${product.id}`}>
                            Editar
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/variantes`}>
                            Gestionar variantes
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/imagenes`}>
                            Gestionar imágenes
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/proveedores`}>
                            Gestionar proveedores
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ================= COMERCIAL ================= */}
                    <DropdownMenuLabel>Comercial</DropdownMenuLabel>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/ventas`}>
                            Ver ventas
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/pedidos`}>
                            Ver pedidos
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/resenas`}>
                            Ver reseñas
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ================= MARKETING ================= */}
                    <DropdownMenuLabel>Marketing</DropdownMenuLabel>

                    <DropdownMenuItem>
                        {/* {product.destacado ? "Quitar destacado" : "Marcar como destacado"} */}
                    </DropdownMenuItem>

                    {
                        !estado.en_oferta ? (
                            <DropdownMenuItem onClick={() => setisOpenAplicarDesc(true)}>
                                <Percent />
                                <span >Aplicar descuento</span>
                                {/* {product.en_oferta ? "Quitar oferta" : "Poner en oferta"} */}
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem>
                                <Percent />
                                <span>Quitar descuento</span>
                                {/* {product.en_oferta ? "Quitar oferta" : "Poner en oferta"} */}
                            </DropdownMenuItem>
                        )
                    }


                    <DropdownMenuItem>
                        {/* {product.nuevo ? "Quitar nuevo" : "Marcar como nuevo"} */}
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ================= INVENTARIO ================= */}
                    <DropdownMenuLabel>Inventario</DropdownMenuLabel>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/stock`}>
                            Ver stock por variante
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                        <Link href={`/admin/productos/${product.id}/historial-stock`}>
                            Historial de stock
                        </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    {/* ================= ESTADO ================= */}
                    <DropdownMenuLabel>Estado</DropdownMenuLabel>

                    {/* <DropdownMenuItem>
                    {product.estado ? "Desactivar producto" : "Activar producto"}
                </DropdownMenuItem> */}
                    <DropdownMenuItem
                        className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer rounded outline-none"
                    // onClick={onMarcarNuevo}
                    >
                        <Tag className={`h-4 w-4 ${estado.es_nuevo ? 'text-blue-600' : 'text-gray-600'}`} />
                        <span>{estado.es_nuevo ? 'Quitar etiqueta nuevo' : 'Marcar como nuevo'}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="text-red-600"
                    //   disabled={hasSales}
                    >
                        {/* {hasSales ? "No se puede eliminar (tiene ventas)" : "Eliminar producto"} */}
                        No se puede eliminar (tiene ventas) : Eliminar producto

                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <ModalAplicarDescuento
                product={product}
                isOpen={isOpenAplicarDesc}
                onClose={() => setisOpenAplicarDesc(false)}

            // producto={{
            //     nombre
            // }}
            // productoId={productoId}
            />
        </>

    )
}