'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Logo = () => {
    const pathname = usePathname()

    // if (pathname === "/") {
    //     return (
    //         <h1 className="flex items-center font-bold" aria-label="homepage">
    //             ACME
    //         </h1>
    //     );
    // }

    return (
        // <Image
        //     alt='logong'
        //     src={"/logo.png"}
        //     width={300}
        //     height={100}
        // />
        <div className='w-full  sm:w-[200px]'>
            <Link href={"/"} className="flex items-center font-bold uppercase">
                zuela amazónica

            </Link>
        </div>

    )
}

export default Logo