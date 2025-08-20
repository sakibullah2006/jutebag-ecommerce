import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Banner = () => {
    return (
        <>
            <div className="banner-block style-one grid sm:grid-cols-2 gap-5 md:pt-20 pt-10 w-full">
                <Link href={'/shop?type=promotion_bestseller'} className="banner-item relative block overflow-hidden duration-500">
                    <div className="banner-img">
                        <Image
                            src={'/images/banner/best_seller.jpg'}
                            width={2000}
                            height={1300}
                            alt='banner1'
                            priority={true}
                            className='duration-1000'
                        />
                    </div>
                    <div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="heading2 text-pretty">Best Sellers</div>
                        <div className="text-button text-pretty relative inline-block pb-1 border-b-2 border-black-500 duration-500 mt-2">Shop Now</div>
                    </div>
                </Link>
                <Link href={'/shop?type=promotion_new-arrival'} className="banner-item relative block overflow-hidden duration-500">
                    <div className="banner-img">
                        <Image
                            src={'/images/banner/new_arrival.jpg'}
                            width={2000}
                            height={1300}
                            alt='banner2'
                            priority={true}
                            className='duration-1000'
                        />
                    </div>
                    <div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="heading2 text-pretty">New Arrivals</div>
                        <div className="text-button text-pretty relative inline-block pb-1 border-b-2 border-black-500 duration-500 mt-2">Shop Now</div>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Banner