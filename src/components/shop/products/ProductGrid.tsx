import { Products } from '@/src/interface'
import ProductItem from './ProductItem'

interface Props {
    products: Products[]
}
const ProductGrid = ({ products }: Props) => {
    return (
        <div
            role="list"
            data-testid="ProductList"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
            {products.map((product, index) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductGrid