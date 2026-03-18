"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { pedido_estado, pedido_metodo_pago } from "@/generated/prisma/enums"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

// export type Order = {
//     id: number;
//     codigo_pedido: string;
//     cliente: string,
//     fecha_pedido: Date,
//     total: number;
//     estado_pedido: pedido_estado,
//     estado_pago: pedido_metodo_pago,
// }
export type Order = {
    id: number;
    codigo_pedido: string;
    cliente: string;
    fecha_pedido: Date | null; // permite null
    total: number;
    estado_pedido: pedido_estado | null; // permite null
    estado_pago: pedido_metodo_pago | null; // permite null
}

export const columns: ColumnDef<Order>[] = [
    // ✅ Checkbox
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },

    // codigo del pedido
    {
        accessorKey: "codigo_pedido",
        header: "Codigo",
    },

    // cliente //!!(user))
    {
        accessorKey: "cliente",
        header: "Cliente",
   
    },
    {
        accessorKey: "fecha_pedido",
        header: "Fecha",
        cell: ({ row }) => {
            const fecha = row.getValue("fecha_pedido") as Date
            const formattedDate = new Date(fecha).toLocaleString("es-PE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
            })
            return <span>{formattedDate}</span>
        }
    },

    // Amount
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            const amount = row.getValue("total") as number
            return <span>S/ {amount.toFixed(2)}</span>
        },
    },

    // Status del pedido
    {
        accessorKey: "estado_pedido",
        header: "Estado",
        cell: ({ row }) => {

            const status = row.getValue("estado_pedido") as
                | "pendiente"
                | "confirmado"
                | "preparando"
                | "enviado"
                | "entregado"
                | "cancelado"

            const statusStyles: Record<typeof status, string> = {
                pendiente: "bg-gray-100 text-gray-700 border border-gray-200",
                confirmado: "bg-blue-100 text-blue-700 border border-blue-200",
                preparando: "bg-amber-100 text-amber-700 border border-amber-200",
                enviado: "bg-indigo-100 text-indigo-700 border border-indigo-200",
                entregado: "bg-emerald-100 text-emerald-700 border border-emerald-200",
                cancelado: "bg-red-100 text-red-700 border border-red-200",
            }

            return (
                <Badge className={`${statusStyles[status]} font-medium capitalize gap-1`}>
                    {/* <span className="h-2 w-2 rounded-full bg-current" /> */}
                    {status}
                </Badge>
            )
        },
    },
    {
        accessorKey: "estado_pago",
        header: "Pago",
        cell: ({ row }) => {

            const estado_pago = row.getValue("estado_pago") as
                | "pendiente"
                | "pagado"
                | "rechazado"
                | "reembolsado"

            const statusStyles: Record<typeof estado_pago, string> = {
                pendiente: "bg-gray-100 text-gray-700 border border-gray-200",
                pagado: "bg-emerald-100 text-emerald-700 border border-emerald-200",
                rechazado: "bg-red-100 text-red-700 border border-red-200",
                reembolsado: "bg-amber-100 text-amber-700 border border-amber-200",
            }

            return (
                <Badge className={`${statusStyles[estado_pago]} font-medium capitalize`}>
                    {estado_pago}
                </Badge>
            )
        },
    },

    // Acciones
    {
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {

            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                        // onClick={() => navigator.clipboard.writeText(payment.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
]