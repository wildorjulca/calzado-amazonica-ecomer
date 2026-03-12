"use client"

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
    id: number;
    nombre: string;
    url_imagen: string;
    total_vendidos: number;
    marca: string | undefined;
    subcategoria: string;
    categoria: string;
    stock: number;
    estado: boolean;
}

interface ProductActionsProps {
    product: Product
}

function ProductActions({ product }: ProductActionsProps) {
    const router = useRouter()

    return (
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

                <DropdownMenuItem>
                    {/* {product.en_oferta ? "Quitar oferta" : "Poner en oferta"} */}
                </DropdownMenuItem>

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

                <DropdownMenuItem>
                    {product.estado ? "Desactivar producto" : "Activar producto"}
                </DropdownMenuItem>

                <DropdownMenuItem
                    className="text-red-600"
                //   disabled={hasSales}
                >
                    {/* {hasSales ? "No se puede eliminar (tiene ventas)" : "Eliminar producto"} */}
                    No se puede eliminar (tiene ventas)" : "Eliminar producto

                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}
export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "url_imagen",
        header: "Imagen",
        cell: ({ row }) => {

            const imagen = row.getValue("url_imagen") as string
            const title = row.getValue("nombre") as string

            return (
                <div className="relative w-10 h-10 rounded-md overflow-hidden">
                    <Image
                        alt={title}
                        src={`/images/products/${imagen}`}
                        fill
                        className="object-cover"
                        loading="lazy"
                        placeholder="empty"
                    />
                </div>
            )

        }
    },
    {
        accessorKey: "nombre",
        header: "Nombre",
    },
    {
        accessorKey: "marca",
        header: "Marca",
    },
    {
        accessorKey: "categoria",
        header: "Categorias",
        cell: ({ row }) => {
            const { categoria, subcategoria } = row.original
            if (!categoria && !subcategoria) {
                return <span className="text-muted-foreground">Sin categoría</span>
            }

            return (
                <div className="flex items-center gap-1 text-sm">
                    <span className="font-medium">{categoria}</span>
                    {subcategoria && (
                        <>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-muted-foreground">{subcategoria}</span>
                        </>
                    )}
                </div>
            )
        }
    },
    //!!precio
    // {
    //     accessorKey: "",
    //     header: "Categorias"
    // },
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const { stock } = row.original

            const stockMap: Record<string, string> = {
                agotado: "text-red-600",
                bajo: "text-yellow-600",
                disponible: "text-green-600 font-semibold",
            }

            let status = "disponible"

            if (stock === 0) status = "agotado"
            else if (stock <= 5) status === "bajo"


            return (
                <div className="flex items-center gap-1.5">
                    <span>
                        {stock}
                    </span>
                    <span className={stockMap[status]}>
                        {status}
                    </span>
                </div>

            )
        }
    },
    {
        accessorKey: "total_vendidos",
        header: "Total ventas"
    },
    {
        accessorKey: "estado",
        header: "Estado",
        cell: ({ row }) => {
            const estado = row.getValue("estado") as boolean

            const statusMap = {
                true: { label: "Activo", variant: "secondary" as const },
                false: { label: "Inactivo", variant: "destructive" as const },
            }

            const config = statusMap[estado.toString() as keyof typeof statusMap]

            return (
                <Badge
                    variant={config.variant}
                >
                    {config.label}
                </Badge>
            )

        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <ProductActions product={row.original} />
        }
    }
]