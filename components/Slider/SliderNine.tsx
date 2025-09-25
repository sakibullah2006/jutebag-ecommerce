'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import 'swiper/css/effect-fade';
import { Deal } from '../../types/deal-type';
import DealSlide from '../Home/DealSlide';
import { MotionDiv } from '../../types/montion-types';

interface SliderNineProps {
    deals: Deal[]
}

const SliderNine = ({ deals }: SliderNineProps) => {
    return (
        <>
            <MotionDiv
                initial={{ opacity: 1, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="slider-block style-nine lg:h-[480px] md:h-[400px] sm:h-[320px] h-[280px] w-full"
            >
                <div className="container lg:pt-5 flex justify-end h-full w-full">
                    <div className="slider-main lg:pl-5 h-full w-full">
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={true}
                            pagination={{ clickable: false }}
                            modules={[Pagination, Autoplay]}
                            className='h-full relative rounded-2xl overflow-hidden'
                            autoplay={{
                                delay: 5000,
                            }}
                        >
                            {deals && deals.filter(deal => deal.landing_section).map((deal, index) => (
                                <SwiperSlide key={deal.slug || index}>
                                    <DealSlide deal={deal} isFirstSlide={index === 0} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </MotionDiv>
        </>
    )
}

export default SliderNine