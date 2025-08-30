// components/HeroSlider.tsx (previously SliderTwo.tsx)
'use client';

import { useEffect, useState } from 'react';
import { Deal } from '../../types/deal-type'; // Ensure this path is correct
// Import Swiper components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import DealSlide from './DealSlide';


// You can reuse your original skeleton component
function SliderSkeleton() {
    return (
        <div className="slider-block style-two bg-linear xl:h-[660px] lg:h-[600px] md:h-[580px] sm:h-[500px] h-[450px] w-full pt-9 md:pt-12 animate-pulse">
            <div className="relative w-full h-full bg-gray-200">
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div className="w-1/2 h-8 bg-gray-300 rounded" />
                    <div className="w-1/3 h-6 bg-gray-300 rounded" />
                    <div className="w-32 h-12 mt-4 bg-gray-300 rounded" />
                </div>
            </div>
        </div>
    );
}

interface HeroSliderProps {
    deals: Deal[];
}

const HeroSlider = ({ deals }: HeroSliderProps) => {
    // This state ensures Swiper only initializes on the client
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <SliderSkeleton />;
    }

    return (
        <div className="  w-full xl:h-[660px] lg:h-[600px] md:h-[580px] h-[450px]">
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true} // Adding navigation arrows is great for UX
                modules={[Autoplay, Pagination, Navigation]}
                className='h-full w-full'
                autoplay={{
                    delay: 5000, // Increased delay for richer content
                    disableOnInteraction: false,
                }}
            >
                {deals && deals.map((deal, index) => (
                    <SwiperSlide key={deal.slug || index}>
                        <DealSlide deal={deal} isFirstSlide={index === 0} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default HeroSlider;