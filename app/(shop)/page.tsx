import { getProductsAll } from '@/src/actions/shop'
import Pagination from '@/src/components/shop/pagination/Pagination'
import ProductGrid from '@/src/components/shop/products/ProductGrid'

interface Props {
  searchParams: Promise<{
    page?: string,
    // marca?: string,
    // talla?: string | string[],
    // color?: string | string[],
    // orden?: "precio-asc" | "precio-desc" | "nuevos" | "mejores" | "recomendados";
  }>,

}
const page = async ({ searchParams }: Props) => {

  const { page } = await searchParams

  const result = await getProductsAll({ page: Number(page) })



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
    <>
      <ProductGrid products={products} />
      <Pagination
        pagination={{
          currentPage: pagination?.currentPage ?? 0,
          totalPages: pagination?.totalPages ?? 0,
        }}
      />
    </>
    // <div className='mx-auto max-w-7xl  mt-5 mb-10'>

    // </div>
  )
}

export default page