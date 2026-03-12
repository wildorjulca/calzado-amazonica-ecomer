import { auth } from '@/auth'
import { CardTitle } from '@/components/ui/card'
import { getProductsFavorites } from '@/src/actions/shop/products/getProductsFavorites'
import ProductGrid from '@/src/components/shop/products/ProductGrid'
import { redirect } from 'next/navigation'


const ListFavoritesPage = async () => {

    const session = await auth()

    if (!session?.user.id) {
        redirect("/login?redirectTo=/listFavorites");
    }

    const usuarioId = Number(session?.user?.id)
    const { ok, products, message } = await getProductsFavorites(usuarioId)


    if (!ok) {
        return (
            <div className="p-6 text-red-600">
                <h2 className="text-lg font-bold">Error</h2>
                <p>{message}</p>
            </div>
        )
    }

    return (
        <div>

            <h3 className='text-2xl mb-8 font-medium'>Tus productos favoritos ❤️</h3>

            <ProductGrid
                products={products || []}
            />
        </div>
    )
}

export default ListFavoritesPage