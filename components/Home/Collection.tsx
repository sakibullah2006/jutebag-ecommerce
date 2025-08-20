'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { useRouter } from 'next/navigation';
import { CategorieType } from '../../types/data-type';
import { useAppData } from '../../context/AppDataContext';
import { PATH } from '../../constant/pathConstants';

interface Props {
    props: string;
}

const Collection: React.FC<Props> = ({ props }) => {
    const router = useRouter()
    const { categories } = useAppData()

    const handleTypeClick = (type: string) => {
        router.push(`/shop?category=${type}`);
    };

    // Skeleton loader for slides
    const skeletonSlides = Array.from({ length: 6 }).map((_, idx) => (
        <div
            key={idx}
            className="min-h-0 min-w-0 h-[300px] max-h-[400px] w-full max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] flex items-center justify-center animate-pulse"
            style={{ maxWidth: 400, maxHeight: 400 }}
        >
            <div className="block relative min-h-0 min-w-0 h-full w-full rounded-2xl overflow-hidden bg-gray-200">
                <div className="bg-img min-h-0 min-w-0 h-full w-full max-h-[400px] max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] flex items-center justify-center">
                    <div className="w-full h-full bg-gray-300" style={{ maxWidth: '400px', maxHeight: '400px' }} />
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-10 duration-500"></div>
                <div className="collection-name heading5 text-center sm:bottom-8 bottom-4 lg:w-[200px] md:w-[160px] w-[100px] md:py-3 py-1.5 bg-white rounded-xl duration-500">
                    <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto" />
                </div>
            </div>
        </div>
    ));

    const isLoading = !categories || categories.length === 0;

    return (
        <>
            <div className={`collection-block ${props} max-h-[600px] mx-auto 2xl:max-w-[1800px] xl:max-w-[1500px] lg:max-w-[1200px] w-full`}>
                <div className="list-collection section-swiper-navigation sm:px-5 px-4">
                    {isLoading ? (
                        <div className="flex gap-4 overflow-x-auto min-h-0 max-h-[600px]">
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
                                    slidesPerView: 2,
                                    spaceBetween: 12,
                                },
                                768: {
                                    slidesPerView: 3,
                                    spaceBetween: 20,
                                },
                                1200: {
                                    slidesPerView: 4,
                                    spaceBetween: 24,
                                },
                                1536: {
                                    slidesPerView: 5,
                                    spaceBetween: 28,
                                },
                                1800: {
                                    slidesPerView: 6,
                                    spaceBetween: 32,
                                },
                            }}
                            className='min-h-0 h-auto max-h-[600px]'
                            style={{ maxHeight: 600 }}
                        >
                            {categories.filter(cat => cat.slug.toLowerCase().split("_").includes("common")).sort((a, b) => b.count - a.count)?.slice(0, 6).map((item) => (
                                <SwiperSlide
                                    key={item.id}
                                    className="min-h-0 min-w-0 h-[300px] max-h-[400px] w-full max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] flex items-center justify-center"
                                    style={{ maxWidth: 400, maxHeight: 400 }}
                                >
                                    <Link href={`${PATH.SHOP}?category=${item.slug.trim()}`} className="collection-item block relative min-h-0 min-w-0 h-full w-full rounded-2xl overflow-hidden cursor-pointer">
                                        <div className="collection-item block relative min-h-0 min-w-0 h-full w-full rounded-2xl overflow-hidden cursor-pointer" >
                                            <div className="bg-img min-h-0 min-w-0 h-full w-full max-h-[400px] max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px] flex items-center justify-center">
                                                <Image
                                                    src={item.image.src || '/images/collection/swimwear.png'}
                                                    width={400}
                                                    height={400}
                                                    className='w-full h-full object-cover max-h-[400px] max-w-[320px] xl:max-w-[360px] 2xl:max-w-[400px]'
                                                    alt={item.name + " image"}
                                                    style={{ maxWidth: '400px', maxHeight: '400px', width: '100%', height: '100%', objectFit: 'cover' }}
                                                />
                                            </div>
                                            <div className="absolute top-0 left-0 w-full h-full bg-black/5  duration-500"></div>
                                            <div className="collection-name text-xs sm:text-sm md:text-base lg:text-lg text-center absolute bottom-4 sm:bottom-6 md:bottom-8 lg:w-[240px] md:w-[200px] sm:w-[140px] w-[120px] left-1/2 transform -translate-x-1/2 md:py-3 py-2 bg-white rounded-xl duration-500">{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </div>
            </div>
        </>
    )
}

export default Collection