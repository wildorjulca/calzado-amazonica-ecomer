'use client'

import { AnimatePresence } from "framer-motion";
import { useAddressList } from '@/src/hooks/queries/adress/useAddress'
import AdressForm from './AdressForm'
import AddresListSkeleton from '../skeleton/adress-list-Skeleton'
import AdressLit from './AdressLit'
import { useState } from 'react'

const AddressSection = () => {


    const [isOpen, setIsOpen] = useState<boolean>(false)
    const queryAdressUer = useAddressList()

    if (queryAdressUer.isError) {
        return (
            <div>
                <p>
                    {queryAdressUer.error.message}
                </p>
            </div>
        )
    }

    return (
        <div className='space-y-4 mb-4'>
            {/* <AnimatePresence mode="wait">
                {queryAdressUer.isLoading ? (
                    <AddresListSkeleton />
                ) : isOpen ? (
                    <AdressForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(!isOpen)}
                    />
                    // <AdressForm />
                ) : queryAdressUer.data && queryAdressUer.data.length > 0 ? (
                    <AdressLit
                        onClose={() => setIsOpen(!isOpen)}
                        adressUser={queryAdressUer.data}
                    />
                ) : (
                    <AdressForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(!isOpen)}
                    />
                )}
            </AnimatePresence> */}


            <AnimatePresence mode="wait">
                {queryAdressUer.isLoading ? (
                    <AddresListSkeleton />
                ) : (
                    <AdressForm
                        isOpen={isOpen}
                        onClose={() => setIsOpen(!isOpen)}
                    />
                    // <AdressForm />
                )}
            </AnimatePresence>

        </div>

    )
}

export default AddressSection