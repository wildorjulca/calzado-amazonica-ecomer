'use client'

import React from 'react'
import Avatar from 'react-avatar';
import { SidebarTrigger } from '../ui/sidebar'
import { Search } from 'lucide-react'

const Header = () => {
    return (
        <div className='bg-white h-14 flex justify-between items-center shadow-2xs border-b-4 '>
            <SidebarTrigger />
            <div className='flex items-center'>
                <div className='flex items-center'>
                    <Search size={16} />
                    <input className='bg-gray-200 rounded-3xl p-1 outline-none' placeholder='Buscar' />
                </div>
                <div>
                    <Avatar name='I G' size='35' round email='' />
                </div>
            </div>
        </div>
    )
}

export default Header