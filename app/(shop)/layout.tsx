import { LoaderProvider } from '@/components/provider/LoaderProvider'
import { Header } from '@/src/components/shop'
import Footer from '@/src/components/shop/footer/Footer'
import React from 'react'

interface Props {
    children: React.ReactNode,
}
// const RootLayoutShop = ({ children }: Props) => {
//     return (
//         <LoaderProvider>
//             <Header channel='' />
//             {/* <div className="flex min-h-[calc(100dvh-64px)] flex-col"> */}
//             <div className='container mx-auto px-4 md:px-0 mt-8 mb-8 flex-1'>
//                 <main className="flex-1">
//                     {children}
//                 </main>
//                 <Footer />
//             </div>
//         </LoaderProvider>
//     )
// }
const RootLayoutShop = ({ children }: Props) => {
    return (
        <LoaderProvider>
            <div className="min-h-screen flex flex-col">
                <Header channel='' />
                <main className="flex-1 container mx-auto p-4 md:p-0 mt-4 md:mt-8">
                    {children}
                </main>

                <Footer />

            </div>
        </LoaderProvider>
    )
}

export default RootLayoutShop