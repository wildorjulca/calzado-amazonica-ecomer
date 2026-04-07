"use client"

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import MenutAcciones from "./menu-acciones";
import { Product } from "../interface/product.type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ProductActionsProps {
    product: Product
}

function ProductActions({ product }: ProductActionsProps) {


    console.log("product actons: ", product)

    return (

        <MenutAcciones
            product={product}
            estado={{
                en_oferta: product.en_oferta,
                es_nuevo: product.es_nuevo
            }}
        />
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
        cell: ({ row }) => {

            const marca = row.getValue("marca") as string

            return (
                <p>{marca ?? "N/A"}</p>

            )
        }
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
        header: "Acciones",
        cell: ({ row }) => {
            return <ProductActions product={row.original} />
        }
    }
]