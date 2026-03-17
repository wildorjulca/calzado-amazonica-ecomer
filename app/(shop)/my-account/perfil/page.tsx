import { auth } from '@/auth'
import Image from 'next/image'
import React from 'react'

const PerfillPage = async () => {

    const session = await auth()

    const user = session?.user
    
    return (
        <div>
            <p className='text-xl mb-2'> Hola {user?.name} 👋</p>
            {user?.image &&
                <Image
                    className='rounded-full'
                    alt={user.name || ""}
                    src={`${user.image}`}
                    width={80}
                    height={80}
                />}
        </div>
    )
}

export default PerfillPage