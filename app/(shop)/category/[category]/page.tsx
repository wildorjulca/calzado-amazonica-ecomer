import { getProductsByCategory } from '@/src/actions/shop/products/getProductsByCategory'
import ProductSortSelect from '@/src/components/shop/category/ProductSortSelect'
import Pagination from '@/src/components/shop/pagination/Pagination'
import EmptyProducts from '@/src/components/shop/products/EmptyProducts'
import ProductGrid from '@/src/components/shop/products/ProductGrid'

interface Props {
  params: Promise<{
    category: string
  }>,
  searchParams:Promise< {
    page?: string;
    subCategory?: string;
    marca?: string;
    orderBy?: string;
    minPrice?: number,
    maxPrice?: number

  }>
}

const Categorypage = async ({ params, searchParams }: Props) => {

  const { category } = await params
  const { page, subCategory, marca, orderBy } = await searchParams


  const result = await getProductsByCategory({
    page: Number(page),
    categorySlug: category,
    subcategory: subCategory,
    marca: marca,
    orderBy: orderBy
  })

  const { ok, products, message, pagination } = result

  if (!ok) {
    return (
      <div className="p-6 text-red-600">
        <h2 className="text-lg font-bold">Error</h2>
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className='w-full'>
      {products.length === 0 ? (
        <EmptyProducts />
      ) : (
        <div>
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              {/* Izquierda - Resultados */}
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">
                  {products.length}
                </span>{" "}
                resultados encontrados
              </div>

              {/* Derecha - Filtros y Ordenamiento */}
              <div className="flex flex-col sm:flex-row gap-3">

                {/* Filtro por precio */}
                <select
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Filtrar por precio</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-200">$100 - $200</option>
                  <option value="200+">$200+</option>
                </select>

                <ProductSortSelect />

              </div>
            </div>
          </div>
          <ProductGrid products={products || []} />

          <Pagination
            pagination={{
              currentPage: pagination?.currentPage ?? 0,
              totalPages: pagination?.totalPages ?? 0
            }}
          />
        </div>
      )}

    </div>
  )
}

export default Categorypage