import { auth } from '@/auth'
import AccountSidebar from '@/src/components/shop/my-account/AccountSidebar'
import AvatarMyAccount from '@/src/components/shop/my-account/avatar'
import { UserAvatar } from '@/src/components/shop/UserMenu/UserAvatar'
import { User, UserRound } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    children: React.ReactNode
}
const LayoutMyaccount = async ({ children }: Props) => {
    const session = await auth()

    if (!session?.user) {
        redirect("/")
    }
    return (
        <section className="h-screen">
            <div className="">
                <div className='bg-white p-5 rounded-xs border shadow-md mb-4'>
                    <div className='flex items-end gap-2.5'>
                        <AvatarMyAccount name={session.user.name!} />
                        <div>
                            <h3 className='text-xl'>Hola!</h3>
                            <p>{session.user.name}</p>
                        </div>

                    </div>
                </div>
                {/* <Title
                    title="Mi Cuenta"
                    subTitle="Gestiona tu información personal, pedidos y direcciones desde un solo lugar."
                /> */}

                <div className="flex flex-col xl:flex-row gap-8">
                    <AccountSidebar />
                    <main className="flex-1 bg-white rounded-xl shadow-md border border-gray-100 p-6 h-auto">
                        {children}
                    </main>
                </div>
                <div className='mt-14 text-sm'>
                    <p>
                        “Estimados clientes: se les recuerda que *tienen derecho a solicitar la devolución del dinero, en aquellos supuestos en los que los productos tengan defectos de fábrica, no se adecúen a lo ofrecido, entre otros supuestos contemplados en el artículo 97 del Código de Protección y Defensa del Consumidor.
                        Este aviso se realiza en virtud de la Resolución 3532-2025/SPC-INDECOPI de la Sala Especializada en Protección al Consumidor del Tribunal de Defensa de la Competencia y de la Propiedad Intelectual del INDECOPI.”
                    </p>
                </div>
            </div>
        </section>
    )
}

export default LayoutMyaccount