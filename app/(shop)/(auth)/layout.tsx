import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import React from 'react'

interface Props {
    children: React.ReactNode
}
const layoutAuth = async ({ children }: Props) => {

    const session = await auth()

    if (session?.user) {
        redirect("/")
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default layoutAuth