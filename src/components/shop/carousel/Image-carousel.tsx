'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/navigation'
import './image-carousel.css'

interface PropsImage {
    images: string[]
}


export default function ImageCarousel({ images }: PropsImage) {


    return (
        <div className="image-carousel relative h-full w-full">
            <Swiper
                navigation
                modules={[Navigation]}
                className="h-full w-full"
            >
                {images.map((imgUrl, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative aspect-square w-full">
                            <Image
                                alt={`Product image ${index + 1}`}
                                src={`/images/products/${imgUrl}`}
                                fill
                                className="object-contain p-2"
                                priority={index === 0}
                                loading={index === 0 ? 'eager' : 'lazy'}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
