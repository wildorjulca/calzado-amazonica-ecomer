'use client'

import React, { useEffect, useState } from 'react'
import SubCategoryDropdown from '../ShopWithSidebar/SubCategoryDropdown';
import CategoryDropdown from '../ShopWithSidebar/CategoryDropdown';
import MarcasDropdown from '../ShopWithSidebar/MarcasDropdown';
import { Funnel, ListFilter } from 'lucide-react';
import { FunnelChart } from 'recharts';

interface Props {
    categorias: {
        id: number;
        nombre: string;
        slug: string;
        count: number
    }[],
    marcas: {
        id: number;
        nombre: string;
        slug: string;
    }[],
    subcategorias: {
        id: number;
        nombre: string;
        slug: string;
        count: number
    }[]
}

const SidebarCategory = ({ categorias, marcas, subcategorias }: Props) => {

    const [stickyMenu, setStickyMenu] = useState(false);
    const [productSidebar, setProductSidebar] = useState(false);

    // Detectar scroll para ajustar posición del botón
    const handleStickyMenu = () => {
        if (window.scrollY >= 80) setStickyMenu(true);
        else setStickyMenu(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleStickyMenu);

        function handleClickOutside(event: MouseEvent) {
            if (!event.target || !(event.target instanceof Element)) return;
            if (!event.target.closest(".sidebar-content")) {
                setProductSidebar(false);
            }
        }

        if (productSidebar) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            window.removeEventListener("scroll", handleStickyMenu);
        };
    }, [productSidebar]);

    return (
        <>
            {/* OVERLAY NEGRO SUAVE */}
            {productSidebar && (
                <div
                    onClick={() => setProductSidebar(false)}
                    className="fixed inset-0 bg-black/20 bg-opacity-30 z-40 xl:hidden transition-opacity"
                />
            )}

            {/* SIDEBAR DESLIZANTE */}
            <div
                className={`sidebar-content fixed xl:hidden z-50 top-0 left-0 h-full bg-white shadow-xl  transition-transform duration-300
                    ${productSidebar ? "translate-x-0" : "-translate-x-full"} w-4/5 max-w-[310px] p-5 overflow-y-auto`}
            >
                {/* BOTÓN CERRAR */}
                {/* <button
                    onClick={() => setProductSidebar(false)}
                    aria-label="Cerrar sidebar"
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 transition"
                >
                    <Funnel />
                </button> */}

                {/* CONTENIDO */}
                <div className="flex flex-col gap-5 mt-5 mb-5">
                    <CategoryDropdown categories={categorias} />
                    <SubCategoryDropdown subcategory={subcategorias} />
                    <MarcasDropdown marcas={marcas} />
                </div>
            </div>

            {/* BOTÓN PARA ABRIR SIDEBAR */}
            <button
                onClick={() => setProductSidebar(!productSidebar)}
                aria-label="Abrir sidebar de filtros"
                className={`xl:hidden fixed top-20 right-5 w-10 h-10 flex items-center justify-center rounded-md bg-white shadow-sm z-50`}
            >
                <Funnel />
            </button>
        </>
    )
}

export default SidebarCategory