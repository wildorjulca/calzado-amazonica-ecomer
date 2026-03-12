import { Products } from '@/src/interface'
import clsx from 'clsx'
import React from 'react'

interface Props {
    selectedColorId?: number,
    colores: Products['colores'],
    onSelectColor: (colorId: number) => void
}
const ProductColorItem = ({ selectedColorId, colores, onSelectColor }: Props) => {
    return (
        <div className='w-full flex gap-1 flex-wrap mt-5'>
            {colores.map((c) => (
                <button
                    onClick={() => onSelectColor(c.id)}
                    key={c.id}
                    className={clsx(
                        "w-[30px] h-[30px]  border border-spacing-x-2.5 hover:cursor-pointer transition-all", {
                        'border-black': selectedColorId === c.id,
                    }
                    )}
                    style={{
                        backgroundColor: c.codigo_hex ?? '#ccc',
                    }}
                    aria-label={c.nombre}
                />
            ))}
        </div>
    )
}

export default ProductColorItem