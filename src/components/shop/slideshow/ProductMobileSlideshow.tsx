'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';



interface Props {
  images: string[];
  title: string;
  className?: string;
}



export const ProductMobileSlideshow = ({ images, title, className }: Props) => {


  return (
    <div className={className}>

      <Swiper
        style={{
          // width: '100vw',
          height: '400px'
        }}
        pagination
        autoplay={{
          delay: 2500
        }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiper2"
      >

        {
          images.map(image => (
            // <SwiperSlide key={image}>
            //   <Image
            //     // width={600}
            //     // height={500}
            //     src={`/images/products/${image}`}
            //     alt={title}
            //     fill
            //     // className="object-fill"
            //     className="object-contain"
            //   />
            // </SwiperSlide>
            <SwiperSlide key={image}>
              <div className="relative w-full h-[400px]">
                <Image
                  src={`/images/products/${image}`}
                  alt={title}
                  fill
                  className="object-contain"
                />
              </div>
            </SwiperSlide>

          ))
        }
      </Swiper>



    </div>
  );
};