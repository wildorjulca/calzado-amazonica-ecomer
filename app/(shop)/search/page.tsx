import { getProductsAll } from '@/src/actions/shop'
import ProductGrid from '@/src/components/shop/products/ProductGrid'
import { notFound } from 'next/navigation'

interface Props {
    searchParams: Promise<{
        query: string
    }>
}
const SearchPage = async ({ searchParams }: Props) => {
    const { query } = await searchParams

    if (!query) {
        notFound();
    }

    const { ok, products, message } = await getProductsAll({ query })

    if (!ok) {
        return (
            <div className="p-6 text-red-600">
                <h2 className="text-lg font-bold">Error</h2>
                <p>{message}</p>
            </div>
        )
    }

    return (
        <div className='mt-5'>
            {products.length > 0 ? (
                <>
                    <div className='mb-4'>
                        <h1 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Resultados de búsqueda {` "${query}"...`}
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            {products.length} producto(s) encontrados
                        </p>
                    </div>
                    <ProductGrid products={products} />
                </>

            ) : (
                <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
                    <span className="text-5xl">😕</span>

                    <h2 className="mt-4 text-xl font-semibold tracking-tight">
                        No encontramos resultados
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-gray-500">
                        No hay productos que coincidan con{' '}
                        <strong>&quot;{query}&quot;</strong>.
                        Intenta con otra palabra o explora nuestras categorías.
                    </p>
                </div>
            )}
        </div>
    )

}

export default SearchPage