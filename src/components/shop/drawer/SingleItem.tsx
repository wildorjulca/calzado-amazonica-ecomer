import { CartProduct, useCartStore } from '@/src/store'
import { Trash2Icon } from 'lucide-react'
import Image from 'next/image'

interface Props {
    product: CartProduct
}
const SingleItem = ({ product }: Props) => {
    const { removeProduct } = useCartStore()

    return (
        <div className='border border-gray-200 w-full  rounded-sm flex items-center bg-white p-1 gap-2 py-2'>
            <div className='bg-gray-200 rounded-sm'>
                <Image
                    className='flex items-center justify-center'
                    alt={product.nombre}
                    src={`/images/products/${product.imagen}`}
                    width={100}
                    height={100}
                />
            </div>
            <div className=' w-full flex flex-col justify-center '>
                <div className='w-full flex items-center justify-between'>
                    <h3 className={`font-sans text-sm`}>{product.nombre}</h3>
                    <button
                        onClick={() => removeProduct(product.varianteId)}
                        className=' border bg-gray-200 p-1 ml-4 rounded-md hover:bg-red-500 hover:text-white transition-all hover:cursor-pointer' >
                        <Trash2Icon />
                    </button>
                </div>
                <div>
                    <p className="font-sans text-sm">Cantidad: <span>{product.cantidad}</span></p>
                    <div className='flex items-center'>
                        <p className='font-sans text-sm'>Color: </p>
                        <span style={{ backgroundColor: product.color }} className="w-4 h-4 inline-block rounded-full ml-2"></span>
                    </div>
                    <p className='font-sans text-sm'>Talla: {product.talla}</p>
                </div>

            </div>

        </div>
    )
}

export default SingleItem