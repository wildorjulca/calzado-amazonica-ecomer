
const EmptyProducts = () => {
    return (
        <div className="flex w-full  flex-col items-center justify-center text-center">
            <span className="text-5xl">😕</span>

            <h2 className="mt-4 text-xl font-semibold tracking-tight">
                No se encontramos resultados
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
                No hay productos con tu busqueda,
                Intenta con otra palabra o explora nuestras categorías.
            </p>
        </div>
    )
}

export default EmptyProducts