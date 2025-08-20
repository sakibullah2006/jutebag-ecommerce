'use client'

import { PATH } from '@/constant/pathConstants';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function SliderSkeleton() {
    return (
        <div className="slider-block style-two bg-linear xl:h-[660px] lg:h-[600px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[400px] w-full pt-9 md:pt-12 animate-pulse">
            <div className="slider-main h-full w-full">
                <div className="slider-item h-full w-full relative flex flex-col md:flex-row overflow-hidden">
                    {/* Skeleton text content left (or top on mobile) */}
                    <div className="flex flex-col justify-center w-full md:w-[60%] px-4 md:pl-8 md:pr-4 py-8 md:py-0 items-center md:items-start relative z-10 gap-4">
                        <div className="bg-gray-200 rounded w-2/3 h-6 md:h-8 mb-2" />
                        <div className="bg-gray-200 rounded w-full h-10 md:h-14 mb-2" />
                        <div className="bg-gray-200 rounded w-5/6 h-6 md:h-8 mb-2" />
                        <div className="bg-gray-200 rounded w-32 h-10 mt-4" />
                    </div>
                    {/* Skeleton image right (or bottom on mobile) */}
                    <div className="md:block hidden absolute right-0 top-0 h-full w-[40%] z-0 pointer-events-none">
                        <div className="absolute right-0 top-0 h-full w-full bg-gray-200 rounded-l-2xl" />
                    </div>
                    <div className="md:hidden relative w-full flex justify-center items-end h-[200px] sm:h-[300px] mt-4">
                        <div className="w-3/4 h-full bg-gray-200 rounded-2xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
import { Deal } from '../../types/deal-type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

interface SliderTwoProps {
    deals: Deal[]
}

const SliderTwo = ({ deals }: SliderTwoProps) => {
    const [docReady, setDocReady] = useState(false);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (document.readyState === 'complete') {
                setDocReady(true);
            } else {
                const onLoad = () => setDocReady(true);
                window.addEventListener('load', onLoad);
                return () => window.removeEventListener('load', onLoad);
            }
        }
    }, []);

    if (!docReady) return <SliderSkeleton />;

    return (
        <>
            <div className={`slider-block style-two bg-linear xl:h-[660px] lg:h-[600px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[400px] w-full pt-9 md:pt-12`}>
                <div className="slider-main h-full w-full">
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={true}
                        pagination={{ clickable: true }}
                        modules={[Pagination, Autoplay]}
                        className='h-full relative'
                        autoplay={{
                            delay: 4000,
                        }}
                    >
                        {deals && deals.map((deal, index) => (
                            <SwiperSlide key={index}>
                                <div className="slider-item h-full w-full relative flex flex-col md:flex-row overflow-hidden">
                                    {/* Background image for md+ screens */}
                                    <div className="hidden md:block absolute right-0 top-0 h-full w-full z-0 pointer-events-none">
                                        <div className="absolute right-0 top-0 h-full w-[70%]">
                                            <Image
                                                src={deal.image.src || '/images/slider/slider-bg.png'}
                                                alt={deal.image.alt}
                                                fill
                                                priority={true}
                                                className="object-contain w-full h-full"
                                            />
                                            {/* Off-white overlay */}
                                            <div className="absolute inset-0 bg-[#f8f8f5]/20" />
                                        </div>
                                    </div>
                                    {/* Text Content always above image */}
                                    <div className="flex flex-col justify-center w-full md:w-[60%] px-4 md:pl-8 md:pr-4 py-8 md:py-0 items-center md:items-start relative z-10">
                                        <div className="text-content flex flex-col items-center md:items-start">
                                            <div className="text-sub-display text-center md:text-left">{deal.offerText}</div>
                                            <div className="text-display text-center md:text-left md:mt-4 mt-2">{deal.title}</div>
                                            <div className="body1 text-center md:text-left md:mt-4 mt-2">{deal.dealDescription}</div>
                                            <Link href={deal.redirect_link} className="button-main md:mt-8 mt-3 self-center md:self-start">Shop Now</Link>
                                        </div>
                                    </div>
                                    {/* Mobile: image below text */}
                                    <div className=" md:hidden relative w-full flex justify-center items-end h-[200px] sm:h-[300px] mt-4">
                                        <Image
                                            src={deal.image.src || '/images/slider/slider-bg.png'}
                                            alt={deal.image.alt}
                                            fill
                                            priority={true}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                        {/* ...existing code... */}
                    </Swiper>
                </div>
            </div>
        </>
    )
}


export default SliderTwo