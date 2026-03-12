import { textFont2, textFont3, textFont4, titleFont } from '@/config/fonts'
import CartList from '@/src/components/shop/cart/cartList'
import OrderSumary from '@/src/components/shop/cart/orderSumary'
import React from 'react'

const CartPage = () => {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-10">
      <div className='col-span-2'>
        <CartList />
      </div>
      <div>
        <OrderSumary />
      </div>


    </section>
  )
}

export default CartPage