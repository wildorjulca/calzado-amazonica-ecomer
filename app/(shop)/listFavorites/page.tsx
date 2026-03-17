import { auth } from '@/auth';
import ProductGrid from '@/src/components/shop/products/ProductGrid';
import { getProductsFavorites } from '@/src/actions/shop/products/getProductsFavorites';
import { redirect } from 'next/navigation';

const ListFavoritesPage = async () => {
  const session = await auth();

  // Si no hay sesión, redirigir al login
  if (!session?.user?.id) {
    redirect("/login?redirectTo=/listFavorites");
  }

  const usuarioId = Number(session.user.id);
  const { ok, products, message } = await getProductsFavorites(usuarioId);

  // Manejo de error
  if (!ok) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-2">¡Oops! Algo salió mal</h2>
        <p className="text-gray-600">{message || "No se pudieron cargar tus favoritos."}</p>
      </div>
    );
  }

  const isEmpty = !products || products.length === 0;

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-6 ">Tus productos favoritos ❤️</h1>

      {isEmpty ? (
        <div className="flex flex-col   mt-16">
          <p className="text-gray-500 text-lg">
            ¡Aún no has agregado productos a tus favoritos!
          </p>
          <p className="text-gray-400 text-sm">
            Explora nuestra tienda y marca tus productos preferidos para verlos aquí.
          </p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default ListFavoritesPage;