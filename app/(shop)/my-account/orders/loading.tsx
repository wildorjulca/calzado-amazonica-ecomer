import { Spinner } from '@/components/ui/spinner'
import React from 'react'

const Loadin = () => {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <Spinner className='size-14'/>
        </div>
    )
}

export default Loadin