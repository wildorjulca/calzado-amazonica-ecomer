'use client'

import { useState } from "react"
import { Label } from '@/components/ui/label'

const StatusSelector = () => {

    const [isNew, setIsNew] = useState(false)
    const [isActive, setIsActive] = useState(true) // 👈 Activo por defecto

    return (
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">

            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Estado del Producto
            </h3>

            {/* Marcar como nuevo */}
            <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700">
                    Marcar como nuevo
                </Label>

                <button
                    type="button"
                    onClick={() => setIsNew(!isNew)}
                    className={`relative w-12 h-6 rounded-full transition 
                        ${isNew ? "bg-blue-600" : "bg-gray-300"}`}
                >
                    <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition 
                            ${isNew ? "translate-x-6" : ""}`}
                    />
                </button>
            </div>

            {/* Activo */}
            <div className="flex items-center justify-between">
                <Label className="text-sm text-gray-700">
                    Activo
                </Label>

                <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative w-12 h-6 rounded-full transition 
                        ${isActive ? "bg-green-600" : "bg-gray-300"}`}
                >
                    <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition 
                            ${isActive ? "translate-x-6" : ""}`}
                    />
                </button>
            </div>

        </div>
    )
}

export default StatusSelector