import { LoaderProvider } from '@/components/provider/LoaderProvider'
import { Header } from '@/src/components/shop'
import React from 'react'

interface Props {
    children: React.ReactNode,
}
const RootLayoutShop = ({ children }: Props) => {
    return (
        <LoaderProvider>
            <Header channel='' />
            {/* <div className="flex min-h-[calc(100dvh-64px)] flex-col"> */}
            <div className='container m-auto mt-8' >
                <main className="flex-1">
                    {children}
                </main>
                {/* <Footer channel={channel} /> */}
            </div>

        </LoaderProvider>
    )
}

export default RootLayoutShop