'use client'

import CulqiCheckout from "@/src/components/shop/checkout-payment/CulqiCheckout"

// import CulqiCheckout from '@/src/components/CulqiCheckout'

export default function Page() {
    return (
        <div className="p-10">
            <CulqiCheckout
            key={2}
                // email="jose@gamil.com"
                // publicKey="pk_test_tstkw8QEH6aCqrTe"
                // amount={7990}
            // title="Compra de ropa"
            // description="Polera oversize"
            // onToken={(token) => {
            //     console.log('TOKEN:', token)
            // }}
            // onError={(e) => console.error('CULQI ERROR:', e)}
            />
        </div>
    )
}