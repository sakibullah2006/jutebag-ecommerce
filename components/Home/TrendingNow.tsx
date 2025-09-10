'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';
import { CategorieType } from '../../types/data-type';
import { useAppData } from '../../context/AppDataContext';
import { PATH } from '../../constant/pathConstants';
import { MotionDiv } from '../../types/montion-types';


const TrendingNow = () => {
    const router = useRouter()
    const { categories } = useAppData()

    const handleTypeClick = (type: string) => {
        router.push(`${PATH.SHOP}?category=${type}`);
    };

    // Skeleton loader for slides
    const skeletonSlides = Array.from({ length: 7 }).map((_, idx) => (
        <div
            key={idx}
            className="trending-item block relative cursor-pointer animate-pulse"
        >
            <div className="bg-img rounded-2xl overflow-hidden bg-gray-200">
                <div className="w-full h-full aspect-square bg-gray-300" />
            </div>
            <div className="trending-name bg-gray-200 absolute bottom-5 left-1/2 -translate-x-1/2 w-[140px] h-10 rounded-xl flex items-center justify-center">
                <div className="h-4 bg-gray-300 rounded w-16" />
            </div>
        </div>
    ));

    const isLoading = !categories || categories.length === 0;

    // console.log('Categories in TrendingNow:', categories);

    return (
        <>
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: "easeInOut" }}
                className="trending-block style-nine md:pt-20 pt-10">
                <div className="container">
                    <div className="heading3 text-center">Trending Right Now
                    </div>
                    <div className="list-trending section-swiper-navigation style-small-border style-center style-outline md:mt-10 mt-6">
                        {isLoading ? (
                            <div className="flex gap-4 overflow-x-auto">
                                {skeletonSlides}
                            </div>
                        ) : (
                            <Swiper
                                spaceBetween={12}
                                slidesPerView={2}
                                navigation
                                loop={true}
                                modules={[Navigation, Autoplay]}
                                breakpoints={{
                                    576: {
                                        slidesPerView: 3,
                                        spaceBetween: 12,
                                    },
                                    768: {
                                        slidesPerView: 4,
                                        spaceBetween: 20,
                                    },
                                    992: {
                                        slidesPerView: 5,
                                        spaceBetween: 20,
                                    },
                                    1290: {
                                        slidesPerView: 5,
                                        spaceBetween: 30,
                                    },
                                }}
                                className='h-full '
                            >
                                {categories.filter(cat => cat.slug.toLowerCase().split("_").includes("common")).sort((a, b) => b.count - a.count)?.slice(0, 7).map((item) => (
                                    <SwiperSlide key={item.id}>
                                        <Link href={`${PATH.SHOP}?category=${item.slug.trim()}`} className="trending-item block relative cursor-pointer">
                                            <div className="bg-img rounded-2xl overflow-hidden max-w-[230px]">
                                                <Image
                                                    src={item.image?.src || 'https://ecogoodsdirect.com/next/wp-content/uploads/2025/08/Asda-Jute-Bag.jpg'}
                                                    width={1000}
                                                    height={1000}
                                                    alt={item.name}
                                                    priority={true}
                                                    className='aspect-square'
                                                />
                                            </div>
                                            <div className="trending-name bg-white absolute bottom-5 left-1/2 -translate-x-1/2 w-[140px] h-10 rounded-xl flex items-center justify-center duration-500 hover:bg-black hover:text-white">
                                                <span className='heading6 text-sm font-light'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</span>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        )}
                    </div>
                </div>
            </MotionDiv>
        </>
    )
}

export default TrendingNow