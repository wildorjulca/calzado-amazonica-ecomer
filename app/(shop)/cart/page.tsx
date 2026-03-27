import CartList from '@/src/components/shop/cart/cartList'
import OrderSumary from '@/src/components/shop/cart/orderSumary'

const CartPage = () => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className='md:col-span-2'>
        <CartList />
      </div>
      <div className=''>
        <OrderSumary />
      </div>

    </section>
  )
}

export default CartPage