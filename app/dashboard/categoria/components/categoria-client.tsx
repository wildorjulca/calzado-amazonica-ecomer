'use client'

import { useState } from 'react'

import CategoriaHeader from './categoria-header'
import CategoriaDialog from './categoria-dialog'

const CategoriaCliente = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="mx-auto">
            {/* Encabezado del header */}
            <CategoriaHeader
                onCreate={() => {
                    setOpen(true)
                }}
            />
            <CategoriaDialog
                open={open}
                onOpenChange={() => {
                    setOpen(false)
                }}
            />
        </div>

    )
}

export default CategoriaCliente