import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { MinusCircle, PlusCircleIcon } from 'lucide-react'

interface Props {
    loadingStock?: boolean
    handleAddToCart?: () => void
    quantity: number
    onValueQuantityChanged: (value: number) => void
}

const AddToCart = ({ loadingStock, handleAddToCart, quantity, onValueQuantityChanged }: Props) => {
    return (
        <div>
            <div className='mb-4'>
                <h3 className='text-sm font-semibold'>Cantidad</h3>
                <div className='flex items-center gap-5 mt-2 '>
                    <button
                        onClick={() => onValueQuantityChanged(-1)}
                        className='flex justify-center items-center hover:cursor-pointer'>
                        <MinusCircle size={28} />
                    </button>
                    <span className='text-[20px]'>{quantity}</span>
                    <button
                        onClick={() => onValueQuantityChanged(+1)}
                        className='flex justify-center items-center hover:cursor-pointer'>
                        <PlusCircleIcon size={28} />
                    </button>
                </div>

            </div>
            <Button
                disabled={loadingStock}
                className='w-full hover:cursor-pointer py-6'
                onClick={handleAddToCart}
            >
                {loadingStock ? (
                    <div className='flex items-center gap-3'>
                        Verificando stock <Spinner />
                    </div>
                ) : (
                    'Agregar al carrito'
                )}
            </Button>
        </div>
    )
}

export default AddToCart