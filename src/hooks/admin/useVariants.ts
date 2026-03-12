
'use client'

import { useState } from "react"


export interface Color {
    id: number;
    nombre: string;
    codigo_hex: string | null;
}

export interface Talla {
    id: number;
    valor: string;
}

export interface Variante {
    color_id: number,
    codigo_hex: string | null;
    color_nombre: string;

    talla_id: number;
    talla_valor: string;

    precio_extra: string;
    cantidad: string; //!! Stock
}
export const useVariants = () => {

    //    const [colorSeleccioando, setcolorSeleccioando] = useState(second)
    const [selectedColors, setSelectedColors] = useState<Color[]>([]);
    const [selectedZises, setSelectedZises] = useState<Talla[]>([]);

    const [variantes, setvariantes] = useState<Variante[]>([])



    const onToggleColor = (color: Color) => {
        setSelectedColors(prev =>
            prev.some((item) => item.id === color.id)
                ? prev.filter((x) => x.id !== color.id)
                : [...prev, color]
        )
    }


    const onToggleZise = (talla: Talla) => {

        setSelectedZises((prev) => {
            const yaExiste = prev.some((t) => t.id === talla.id)

            if (yaExiste) {
                const updateTalla = prev.filter((t) => t.id !== talla.id)
                return updateTalla
            }
            const saveTalla = [...prev, talla]
            return saveTalla
        }
        )
    }


    const generarVariantes = () => {

        const combinaciones: Variante[] = []


        selectedColors.forEach(c => {
            selectedZises.forEach(t => {
                const varianteExistente = variantes.find(v =>
                    v.color_id === c.id &&
                    v.talla_id === t.id
                )

                if (varianteExistente) {
                    // return
                    combinaciones.push(varianteExistente)
                } else {
                    combinaciones.push({
                        color_id: c.id,
                        codigo_hex: c.codigo_hex,
                        color_nombre: c.nombre,
                        cantidad: "",
                        precio_extra: "",
                        talla_id: t.id,
                        talla_valor: t.valor

                    })
                }


            })

        });

        setvariantes(combinaciones)

    }

    const eliminarVariante = (variante: Variante) => {
        const updateVariante = variantes.filter(v => !(v.color_id === variante.color_id && v.talla_id === variante.talla_id))
        setvariantes(updateVariante)
    }

    const updateStockVariante = (variante: Variante, cantidad: string) => {

        setvariantes(prev =>
            prev.map(v =>
                v.color_id === variante.color_id && v.talla_id === variante.talla_id ?
                    { ...v, cantidad: cantidad }
                    : v
            )
        )
    }

    const updatePriceVariante = (variante: Variante, precio: string) => {

        setvariantes((prev) =>
            prev.map(v =>
                v.color_id === variante.color_id && v.talla_id === variante.talla_id ?
                    { ...v, precio_extra: precio }
                    : v
            )
        )
    }




    return {
        onToggleColor,
        selectedColors,

        onToggleZise,
        selectedZises,

        variantes,
        eliminarVariante,
        updateStockVariante,
        updatePriceVariante,
        generarVariantes

    }


}