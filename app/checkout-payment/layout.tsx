import { auth } from '@/auth'
import { textFont3, textFont4 } from '@/config/fonts'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    children: React.ReactNode
}
const CheckoutLayout = async ({ children }: Props) => {

    const session = await auth()

    console.log(session)

    if (!session?.user) {
        redirect("/login?redirectTo=/checkout-payment");
    }
    
    return (
        <div className='bg-gray-100 min-h-screen'>
            <header className="border-b border-gray-300 py-4">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* <div className="text-[20px] font-medium">FASHIONSHINY</div> */}
                        <h3 className={`${textFont3.className} antialiased font-medium text-xl`}>SUELA AMAZONICA</h3>
                        <div className="text-right">
                            <div className="text-[14px] text-gray-600">¿Necesitas ayuda? +51 987 654 321</div>
                        </div>
                    </div>
                </div>
            </header>

            <section className='bg-white min-h-screen'>
                {children}
            </section>

        </div>
    )
}

export default CheckoutLayout