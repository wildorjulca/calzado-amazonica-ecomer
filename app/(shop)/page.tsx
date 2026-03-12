import { getProductsAll } from '@/src/actions/shop'
import ProductGrid from '@/src/components/shop/products/ProductGrid'

const page = async () => {

  const result = await getProductsAll({})

  const { ok, products, message } = result

  if (!ok) {
    return (
      <div className="p-6 text-red-600">
        <h2 className="text-lg font-bold">Error</h2>
        <p>{message}</p>
      </div>
    )
  }
  return (
    // <div className='mx-auto max-w-7xl  mt-5 mb-10'>
      <ProductGrid products={products} />
    // </div>
  )
}

export default page