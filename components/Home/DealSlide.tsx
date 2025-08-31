// components/DealSlide.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Deal } from '../../types/deal-type';
import CountdownTimer from '../Other/CountdownTimer';
import { PATH } from '../../constant/pathConstants';
import { useRouter } from 'next/navigation';

interface DealSlideProps {
    deal: Deal;
    isFirstSlide: boolean;
}

const DealSlide = ({ deal, isFirstSlide }: DealSlideProps) => {
    const router = useRouter()

    return (
        // This is our positioning context. `relative` is crucial for `absolute` children.
        <div className="relative w-full h-full">
            <Image
                // onClick={() => router.push(`${PATH.OFFERS_INFO}/${deal.slug}`)}
                src={deal.image.src || '/images/slider/slider-bg.png'}
                alt={'Promotional Banner'}
                fill
                priority={isFirstSlide}
                className="object-contain"
            />

            {/* CHANGE #1: New container specifically for the absolutely positioned timer. */}
            {/* It's placed at the top of the slide and horizontally centered. */}
            <div className="absolute top-[3%] left-1/2 -translate-x-1/2 z-20 w-full">
                <div className="bg-red-700/90 text-white p-2 rounded-xl flex gap-2 justify-center items-center">
                    <p className="max-sm:text-xs md:text-xl uppercase text-center font-bold text-white/90">Hurry, offer ends in:</p>
                    <CountdownTimer expiryDate={deal.expiry_date} />
                </div>
            </div>

            {/* CHANGE #2: This container is now ONLY for the CTA button. */}
            {/* We use `justify-end` to push it to the bottom of the slide. */}
            <div className="relative z-10 flex h-full flex-col items-center justify-end pb-[15%] max-sm:pb-[25%] md:pb-[13%]">
                <Link
                    href={deal.redirect_link}
                    className="group flex items-center gap-x-2 rounded-full text-green-600 bg-white font-bold py-2 px-6 text-base md:py-3 md:px-8 md:text-lg transition-all duration-300 ease-in-out hover:bg-green-500 hover:text-gray-900"
                >
                    Shop Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
};

export default DealSlide;