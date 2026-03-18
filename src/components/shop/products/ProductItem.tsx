'use client'

import { Products } from '@/src/interface'
import Link from 'next/link'
import ImageCarousel from '../carousel/Image-carousel'
import ProductColorItem from './ProductColorItem'
import { useEffect, useState } from 'react'
import { useProductImagesByColor } from '@/src/hooks/queries/product/useProductImagesByColor'
import ImageSkeleton from '../skeleton/ImageSkeleton'
import AddTofavorites from '../product/addTo-favorites'

interface Props {
    product: Products
}
const ProductItem = ({ product }: Props) => {

    const [images, setImages] = useState<Products['producto_imagen'] | undefined>(product.producto_imagen)
    const [selectColorId, setselectColorId] = useState<number | null>(null)

    const queryProductImagesByColor = useProductImagesByColor(product.id, selectColorId!);


    useEffect(() => {
        if (selectColorId) {
            if (queryProductImagesByColor.data) {
                setImages(queryProductImagesByColor?.data.product_imagenes || undefined)
                // setImages(queryProductImagesByColor.data.product_imagenes || [])
            }
        } else {
        }
    }, [queryProductImagesByColor.data, selectColorId])


    return (
        <div className='w-full'>
            <div className="relative aspect-square overflow-hidden bg-neutral-100">

                <AddTofavorites
                    producto_id={product.id}
                    isFavorite={product.isFavorite}
                />
                {queryProductImagesByColor.isLoading ? (
                    <ImageSkeleton />
                ) : (
                    <ImageCarousel
                        key={product.id}
                        images={images || []}
                    />
                )}





                {/* <NextImage {...props} className="h-full w-full object-contain object-center p-2" /> */}
            </div>
            {/* colores */}
            <ProductColorItem
                selectedColorId={selectColorId || undefined}
                onSelectColor={(colorId) => setselectColorId(colorId)}
                colores={product.colores}
            />
            <div className="mt-2 flex justify-between">
                <div>
                    <Link href={`/product/${product.slug}`} className="mt-1 text-sm font-semibold text-neutral-900 hover:text-blue-500">{product.nombre}</Link>
                    {/* <p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
                        {product.nombre}
                    </p> */}
                </div>
                <p className="mt-1 text-sm font-semibold text-neutral-900" data-testid="ProductElement_PriceRange">
                    S/ {product.precio_base_venta}
                    {/* {formatMoneyRange({
                        start: product?.pricing?.priceRange?.start?.gross,
                        stop: product?.pricing?.priceRange?.stop?.gross,
                    })} */}
                </p>
            </div>
        </div>
    )
}

export default ProductItem