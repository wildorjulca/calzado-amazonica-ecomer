'use client'

import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import AddressSection from '@/src/components/shop/checkout-payment/AddressSection'
import DeliveryEstimateMessage from '@/src/components/shop/checkout-payment/DeliveryEstimateMessage'
import PaymentBox from '@/src/components/shop/checkout-payment/PaymentBox'
import { OrderSummary } from '@/src/components/shop/checkout-payment/OrderSummary'
import CheckoutPaymentButton from '@/src/components/shop/checkout-payment/CheckoutPaymentButton'

export type CheckoutFormInputs = {
  nombres: string
  apellidos: string
  telefono: string
  direccion: string
  distrito_id: string
  referencia?: string
  es_principal?: boolean
  region_id: string
  provincia_id: string
}

const CheckoutPage = () => {
  const methods = useForm<CheckoutFormInputs>({
    mode: 'onChange',
  })

  return (
    <FormProvider {...methods}>
      <form>
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="col-span-1 py-10 lg:pr-10">
              <AddressSection />
              
              <DeliveryEstimateMessage />

              <div className="mt-4 mb-4">
                <PaymentBox />
              </div>

              <CheckoutPaymentButton />
            </div>

            <div className="bg-gray-100 p-10 lg:sticky lg:top-0 lg:self-start lg:h-screen">
              <OrderSummary />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default CheckoutPage