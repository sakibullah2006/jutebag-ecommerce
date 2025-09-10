'use client'

import Image from 'next/image';
import React from 'react';
import 'swiper/css/bundle';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MotionDiv } from '../../types/montion-types';

const brandImages = [
    '/images/brand/affiliated_1.webp',
    '/images/brand/affiliated_2.webp',
    '/images/brand/affiliated_3.webp',
    '/images/brand/affiliated_4.webp',
    '/images/brand/affiliated_5.webp',
    '/images/brand/affiliated_6.webp',
];

const Brand = () => {
    return (
        <>
            <div className="brand-block md:py-[60px] py-[32px]">
                <div className="container">
                    <MotionDiv
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="list-brand"
                    >
                        <Swiper
                            spaceBetween={12}
                            slidesPerView={2}
                            loop={true}
                            modules={[Autoplay]}
                            autoplay={{
                                delay: 4000,
                            }}
                            breakpoints={{
                                500: {
                                    slidesPerView: 3,
                                    spaceBetween: 16,
                                },
                                680: {
                                    slidesPerView: 4,
                                    spaceBetween: 16,
                                },
                                992: {
                                    slidesPerView: 5,
                                    spaceBetween: 16,
                                },
                                1200: {
                                    slidesPerView: 6,
                                    spaceBetween: 16,
                                },
                            }}
                        >
                            {brandImages.map((src, index) => (
                                <SwiperSlide key={index}>
                                    <div className="brand-item relative flex items-center justify-center h-[36px]">
                                        <Image
                                            src={src}
                                            width={300}
                                            height={300}
                                            alt={`brand-${index + 1}`}
                                            className='h-full w-auto duration-500 relative object-cover'
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </MotionDiv>
                </div>
            </div>
        </>
    )
}

export default Brand
