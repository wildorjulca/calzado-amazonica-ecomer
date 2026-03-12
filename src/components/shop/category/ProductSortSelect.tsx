'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

const ProductSortSelect = () => {

    const router = useRouter()
    const searchParams = useSearchParams()

    const handleOrderProduct = (value: string) => {

        const params = new URLSearchParams(searchParams.toString())

        if (value) {
            params.set("orderBy", value)
        } else {
            params.delete("orderBy")
        }
        router.push(`?${params.toString()}`)
    }

    return (
        <div>
            {/* Ordenamiento */}
            <select
                onChange={(e) => handleOrderProduct(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
                <option value="">Ordenar por</option>
                <option value="OrderByPriceASC">Precio: menor a mayor</option>
                <option value="OrderByPriceDESC">Precio: mayor a menor</option>
                <option value="OrderByNameASC">Nombre A-Z</option>
                <option value="OrderByNameDESC">Nombre Z-A</option>
            </select>
        </div>
    )
}

export default ProductSortSelect