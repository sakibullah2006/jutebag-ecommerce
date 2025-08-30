// components/DealBanner.tsx (previously SliderTwo.tsx)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Deal } from '../../types/deal-type'; // Make sure this path is correct
import CountdownTimer from '../Other/CountdownTimer';

// A simplified skeleton for a static banner
function BannerSkeleton() {
    return (
        <div className="relative w-full xl:h-[660px] lg:h-[600px] md:h-[580px] h-[450px] bg-gray-200 animate-pulse">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-1/2 h-8 bg-gray-300 rounded" />
                <div className="w-1/3 h-6 bg-gray-300 rounded" />
                <div className="w-32 h-12 mt-4 bg-gray-300 rounded" />
            </div>
        </div>
    );
}

interface DealBannerProps {
    // We now expect a single deal object
    deal?: Deal;
}

const DealBanner = ({ deal }: DealBannerProps) => {
    // If there's no deal, we can show a skeleton or nothing
    if (!deal) {
        return <BannerSkeleton />;
    }

    return (
        <div className="relative w-full xl:h-[660px] lg:h-[600px] md:h-[580px] h-[450px] overflow-hidden">
            {/* 1. Background Image */}
            <Image
                src={deal.image.src}
                alt={deal.image.alt || deal.title}
                fill
                priority // Crucial for LCP (Largest Contentful Paint)
                className="object-cover z-0" // object-cover ensures the image covers the container
            />

            {/* 2. Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40 z-10" />

            {/* 3. Centered Content */}
            <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white p-4">
                <h2 className="text-xl md:text-2xl font-semibold uppercase tracking-widest">
                    {deal.offerText}
                </h2>

                <h1 className="text-4xl md:text-6xl font-bold my-4">
                    {deal.title}
                </h1>

                <p className="max-w-2xl text-base md:text-lg text-gray-200 mb-8">
                    {deal.dealDescription}
                </p>

                {/* 4. Call-to-Action Button */}
                <Link
                    href={deal.redirect_link}
                    className="button-main bg-green-800 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-transform duration-200 ease-in-out hover:scale-105"
                >
                    Shop Now
                </Link>

                {/* 5. Countdown Timer */}
                <div className="mt-12">
                    <p className="text-sm uppercase text-gray-300 mb-2">Hurry, offer ends in:</p>
                    <CountdownTimer expiryDate={deal.expiry_date} />
                </div>
            </div>
        </div>
    );
};

export default DealBanner;