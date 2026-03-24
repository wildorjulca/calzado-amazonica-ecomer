'use client'

import React, { useEffect, useState } from 'react'
import SubCategoryDropdown from '../ShopWithSidebar/SubCategoryDropdown';
import CategoryDropdown from '../ShopWithSidebar/CategoryDropdown';
import MarcasDropdown from '../ShopWithSidebar/MarcasDropdown';
import { Funnel, X } from 'lucide-react'; // Importa también la X

interface Props {
    categorias: { id: number; nombre: string; slug: string; count: number }[],
    marcas: { id: number; nombre: string; slug: string }[],
    subcategorias: { id: number; nombre: string; slug: string; count: number }[]
}

const SidebarCategory = ({ categorias, marcas, subcategorias }: Props) => {
    const [productSidebar, setProductSidebar] = useState(false);

    // Cerrar sidebar al hacer click fuera (móvil)
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (!event.target || !(event.target instanceof Element)) return;
            if (!event.target.closest(".sidebar-mobile")) {
                setProductSidebar(false);
            }
        }
        if (productSidebar) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [productSidebar]);

    return (
        <>
            {/* ===== SIDEBAR MÓVIL ===== */}
            {productSidebar && (
                <div
                    onClick={() => setProductSidebar(false)}
                    className="fixed inset-0 bg-black/20 z-40 xl:hidden transition-opacity"
                />
            )}
            <div
                className={`sidebar-mobile fixed top-0 left-0 h-full bg-white w-4/5 max-w-[310px] p-5 overflow-y-auto z-50 transition-transform duration-300
                    ${productSidebar ? "translate-x-0" : "-translate-x-full"} xl:hidden`}
            >
                <div className="flex flex-col gap-5 mt-5 mb-5">
                    <CategoryDropdown categories={categorias} />
                    <SubCategoryDropdown subcategory={subcategorias} />
                    <MarcasDropdown marcas={marcas} />
                </div>
            </div>

            {/* ===== SIDEBAR DESKTOP ===== */}
            <div className="hidden xl:flex xl:flex-col xl:w-[270px] xl:flex-shrink-0 xl:p-4 xl:bg-white xl:shadow-none">
                <div className="flex flex-col gap-5">
                    <CategoryDropdown categories={categorias} />
                    <SubCategoryDropdown subcategory={subcategorias} />
                    <MarcasDropdown marcas={marcas} />
                </div>
            </div>

            {/* ===== BOTÓN FILTRO SOLO MÓVIL ===== */}
            <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label={productSidebar ? "Cerrar filtros" : "Abrir filtros"}
                className="xl:hidden fixed top-20 right-5 w-10 h-10 flex items-center justify-center rounded-md bg-white shadow-sm z-50"
            >
                {productSidebar ? <X /> : <Funnel />}
            </button>
        </>
    )
}

export default SidebarCategory