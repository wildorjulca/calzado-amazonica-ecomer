'use client'

import { useState } from 'react'
import { useLoader } from '@/components/provider/LoaderProvider'
import { Button } from '@/components/ui/button'
import { addToFavorites } from '@/src/actions/shop/product/addToFavorites'
import { Heart } from 'lucide-react'

interface Props {
    producto_id: number;
    isFavorite: boolean
}

const AddTofavorites = ({ producto_id, isFavorite }: Props) => {

    const { setLoading } = useLoader()
    const [favorite, setFavorite] = useState(isFavorite)

    const handleAddToFavorites = async () => {

        setLoading(true)

        try {
            const res = await addToFavorites(producto_id)

            // 🔥 SOLO cambia si el servidor respondió OK
            if (res?.ok) {
                setFavorite(prev => !prev)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Button
            variant="outline"
            className='absolute z-10 rounded-full p-0 w-[40px] h-[40px] right-2 top-2'
            onClick={handleAddToFavorites}
        >
            {favorite
                ? <Heart fill="#000" />
                : <Heart strokeWidth={1} />
            }
        </Button>
    )
}

export default AddTofavorites