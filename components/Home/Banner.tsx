import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Banner as BannerType } from '../../types/banner-type'

interface BannerProps {
    banners: BannerType[]
}

const Banner = ({ banners }: BannerProps) => {
    const getBaseUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.origin
        }
        return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    }

    const baseUrl = getBaseUrl()

    return (
        <>
            <div className="banner-block md:pt-20 pt-10">
                <div className="container">
                    <div className="list-banner grid lg:grid-cols-3 md:grid-cols-2 lg:gap-[30px] gap-[20px]">
                        {banners && banners.length > 0 && banners.slice(0, 6).map((banner) => (
                            <Link href={banner.url} className="banner-item relative block duration-500">
                                <div className="banner-img w-full rounded-2xl overflow-hidden relative">
                                    <Image
                                        src={banner.image.src || 'https://ecogoodsdirect.com/next/wp-content/uploads/2025/08/Untitled-510-x-250-px.webp'}
                                        width={600}
                                        height={400}
                                        alt='bg-img'
                                        className='w-full duration-500'
                                    />
                                    <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                                </div>
                                <div className="banner-content absolute left-[30px] top-1/2 -translate-y-1/2">
                                    <div className="heading6 text-white font-bold">{banner.title}</div>
                                    <div className="caption1 font-bold text-white relative inline-block pb-1 border-b-2 border-white duration-500 mt-2">Shop Now</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner