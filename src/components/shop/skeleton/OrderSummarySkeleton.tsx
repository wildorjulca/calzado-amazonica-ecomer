'use client'


const OrderSummarySkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Lista de productos (simulamos 2 productos) */}
            {[...Array(2)].map((_, i) => (
                <div key={i} className="w-full flex gap-4 items-center">
                    {/* Imagen placeholder */}
                    <div className="size-16 shrink-0 bg-gray-300 rounded-md h-16 w-16"></div>
                    {/* Texto y precio placeholder */}
                    <div className="w-full flex justify-between items-center">
                        <div className="space-y-1 w-full">
                            <div className="h-4 bg-gray-300 w-3/5 rounded"></div>
                            <div className="h-3 bg-gray-300 w-2/5 rounded"></div>
                        </div>
                        <div className="h-4 bg-gray-300 w-12 rounded"></div>
                    </div>
                </div>
            ))}

            {/* Resumen de subtotal y envío */}
            <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 w-20 rounded"></div>
                    <div className="h-4 bg-gray-300 w-16 rounded"></div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-300 w-16 rounded"></div>
                    <div className="h-4 bg-gray-300 w-16 rounded"></div>
                </div>
            </div>

            {/* Total */}
            <div className="mt-4 space-y-1">
                <div className="flex justify-between items-center">
                    <div className="h-5 bg-gray-300 w-24 rounded"></div>
                    <div className="h-5 bg-gray-300 w-20 rounded"></div>
                </div>
                <div className="h-3 bg-gray-300 w-32 rounded"></div>
            </div>
        </div>
    )
}

export default OrderSummarySkeleton