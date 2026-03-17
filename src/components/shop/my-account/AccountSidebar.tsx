'use client'

import clsx from 'clsx';
import { Briefcase, Heart, Icon, LogOut, Settings, ShoppingBag, User } from 'lucide-react';
import Link from 'next/link'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';


const links = [
    { label: "Perfil", href: "/my-account/perfil", icon: User },
    { label: "Mis órdenes", href: "/my-account/orders", icon: ShoppingBag },
    { label: "Favoritos", href: "/my-account/favoritos", icon: Heart },
    { label: "Experiencias", href: "/my-account/experiencias", icon: Briefcase },
    { label: "Configuración de la cuenta", href: "/my-account/configuracion", icon: Settings },
];

const AccountSidebar = () => {
    const pathname = usePathname()

    // console.log(isActive.get(""))
    return (
        <div className='w-2xs bg-white shadow-md border rounded-xs'>
            <div className='flex flex-col'>
                {links.map(item => {
                    const isActive = item.href === pathname
                    // console.log(isActive)
                    const Icon = item.icon
                    return (
                        <Link
                            className={
                                clsx(
                                    "flex items-center gap-4 hover:bg-[#C4C4C4] hover:cursor-pointer p-3",
                                    {
                                        "bg-[#C4C4C4] border-l-4 border-gray-500 text-black font-semibold": isActive,
                                        "border-l-4 border-transparent": !isActive
                                    }

                                )
                            }
                            key={item.href} href={item.href}>
                            <Icon size={25} strokeWidth={1} />
                            <span>{item.label}</span>

                        </Link>
                    )
                })}
                <button className='p-3 border flex items-center gap-4 hover:cursor-poin'>
                    <LogOut size={25} strokeWidth={1} /> <span>Salir</span>
                </button>
            </div>

        </div>
    )
}

export default AccountSidebar