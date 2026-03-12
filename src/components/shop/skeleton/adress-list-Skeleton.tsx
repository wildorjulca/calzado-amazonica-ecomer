import React from 'react'

const AddresListSkeleton = () => {
    return (
        <div className="space-y-4">
            {/* Esqueleto para direcciones existentes */}
            {[1, 2, 3].map((item) => (
                <div
                    key={item}
                    className="border border-gray-300 rounded-md p-4 animate-pulse"
                >
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                                {/* Línea para calle y número */}
                                <div className="h-4 bg-gray-200 rounded w-32"></div>
                                {/* Etiqueta predeterminada (solo aparece en algunos) */}
                                {item === 1 && (
                                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                                )}
                            </div>
                            {/* Línea para distrito y provincia */}
                            <div className="h-3 bg-gray-200 rounded w-40 mb-2"></div>
                            {/* Línea para referencia (solo aparece en algunos) */}
                            {item % 2 === 0 && (
                                <div className="h-3 bg-gray-200 rounded w-48 mt-1"></div>
                            )}
                        </div>
                        {/* Icono de selección (solo aparece en algunos) */}
                        {item === 1 && (
                            <div className="h-5 w-5 bg-gray-200 rounded-full"></div>
                        )}
                    </div>
                </div>
            ))}

            {/* Esqueleto para el botón de agregar dirección */}
            <div className="w-full text-[14px] py-2 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-40 mx-auto"></div>
            </div>
        </div>
    )
}

export default AddresListSkeleton