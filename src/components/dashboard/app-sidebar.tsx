"use client"

import {
    ClipboardList,
    Layers,
    ListTree,
    Package,
    Palette,
    Ruler,
    Tag,
    FileText,
    Users,
    BarChart3,
    LucideProps
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/src/components/ui/sidebar"

import { usePathname } from "next/navigation"
import clsx from "clsx"

const catalogo = [
    { title: "Productos", url: "/dashboard/producto", icon: Package },
    { title: "Categorías", url: "/dashboard/categories", icon: Layers },
    { title: "Subcategorías", url: "/dashboard/subcategories", icon: ListTree },
    { title: "Tallas", url: "/dashboard/sizes", icon: Ruler },
    { title: "Colores", url: "/dashboard/colors", icon: Palette },
    { title: "Marcas", url: "/dashboard/brands", icon: Tag },
]

const ventas = [
    { title: "Pedidos", url: "/dashboard/orders", icon: ClipboardList },
    { title: "Cotizaciones", url: "/dashboard/quotes", icon: FileText },
    { title: "Facturación", url: "/dashboard/invoices", icon: FileText },
    { title: "Clientes", url: "/dashboard/customers", icon: Users },
    { title: "Reportes", url: "/dashboard/reports", icon: BarChart3 },
]

type ItemsPathName = {
    title: string;
    url: string;
    icon: React.ForwardRefExoticComponent<LucideProps>;
}
export function AppSidebar() {
    const pathname = usePathname()

    const renderItem = (item: ItemsPathName) => {
        const isActive = pathname === item.url

        return (
            <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                    <a
                        href={item.url}
                        className={clsx(
                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
                            {
                                "bg-slate-700 hover:text-white font-medium hover:bg-slate-700": isActive,
                                "hover:bg-slate-800 hover:text-white": !isActive,
                            }
                        )}
                    >
                        <item.icon
                            className={clsx("w-4 h-4", {
                                "text-white": isActive,
                                "text-slate-400": !isActive,
                            })}
                        />
                        {item.title}
                    </a>
                </SidebarMenuButton>
            </SidebarMenuItem>
        )
    }

    return (
        <Sidebar className="border-none">
            <SidebarContent className="bg-slate-900 text-slate-300 border-r border-slate-800">

                {/* Header */}
                <SidebarHeader className="bg-slate-800 border-b border-blue-700 px-4 py-4">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-lg font-semibold text-white">
                            SUELA AMAZÓNICA
                        </h1>
                        <p className="text-xs text-slate-400">
                            Sistema Empresarial
                        </p>
                    </div>
                </SidebarHeader>

                {/* Gestión de Catálogo */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-slate-500 uppercase text-xs tracking-wider px-3 mt-4">
                        Gestión de Catálogo
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1 mt-2">
                            {catalogo.map(renderItem)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Gestión de Ventas */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-slate-500 uppercase text-xs tracking-wider px-3 mt-6">
                        Gestión de Ventas
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1 mt-2">
                            {ventas.map(renderItem)}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}