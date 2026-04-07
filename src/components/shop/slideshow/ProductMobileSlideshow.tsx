'use client';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import './slideshow.css';
import AddTofavorites from '../product/addTo-favorites';



interface Props {
  images: string[];
  title: string;
  isFavorite: boolean; // !!  Verificar si el usuario tiene como favoritos a este producto
  producto_id: number;   // !! recibe el id para hacer la accion en la ui de AddTofavorites
  className?: string;
}

export const ProductMobileSlideshow = ({ images, isFavorite, producto_id, title, className }: Props) => {


  return (
    <div className={className}>

      <AddTofavorites
        isFavorite={isFavorite}
        producto_id={producto_id}
      />

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