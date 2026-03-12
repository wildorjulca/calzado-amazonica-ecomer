'use client';

import { useState } from 'react';
import Image from "next/image"

import { Swiper as SwiperObject } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';
// import { ProductImage } from '../product-image/ProductImage';



interface Props {
    images: string[];
    title: string;
    className?: string;
}



export const ProductDesktopSlideshow = ({ images, title, className }: Props) => {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();


    return (
        <div className={className}>

            <Swiper

                style={{
                    '--swiper-navigation-color': '#444',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties
                }
                spaceBetween={10}
                navigation={true}
                autoplay={{
                    delay: 2500
                }}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image} className='bg-gray-50 p-10'>
                            <Image
                                width={800}
                                height={800}
                                src={`/images/products/${image}`}
                                alt={title}
                                // className="rounded-lg object-contain"
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {
                    images.map(image => (
                        <SwiperSlide key={image}>
                            <Image
                                width={100}
                                height={100}
                                src={`/images/products/${image}`}
                                alt={title}
                                className="rounded-lg object-fill border border-3 transition-all"
                            />
                        </SwiperSlide>

                    ))
                }
            </Swiper>


        </div>
    );
};