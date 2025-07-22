import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function HomeLoading() {
    return (
        <>
            {/* TopNavOne Loading */}
            <div className="top-nav md:h-[44px] h-[30px] style-one bg-black">
                <div className="container mx-auto h-full">
                    <div className="top-nav-main flex justify-between max-md:justify-center h-full">
                        <div className="left-content flex items-center gap-5 max-md:hidden">
                            {/* Language/Currency placeholders */}
                        </div>
                        <div className="text-center text-button-uppercase text-white flex items-center">
                            <div className="h-4 bg-white/20 rounded w-64 animate-pulse"></div>
                        </div>
                        <div className="right-content flex items-center gap-5 max-md:hidden">
                            {[...Array(5)].map((_, index) => (
                                <div key={index} className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div id="header" className='relative w-full'>
                {/* Header Loading Skeleton */}
                <div className="header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px] bg-transparent">
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full">
                            <div className="menu-mobile-icon lg:hidden flex items-center">
                                <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                            </div>
                            <div className="left flex items-center gap-16">
                                <div className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                    <div className="w-32 h-8 bg-gray-700/50 rounded animate-pulse"></div>
                                </div>
                                <div className="menu-main h-full max-lg:hidden">
                                    <ul className='flex items-center gap-8 h-full'>
                                        <li className='h-full flex items-center'>
                                            <div className="w-16 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                        </li>
                                        <li className='h-full flex items-center'>
                                            <div className="w-20 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right flex gap-12">
                                <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                    <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                    <div className="line absolute bg-gray-700/30 w-px h-6 -right-6"></div>
                                </div>
                                <div className="list-action flex items-center gap-4">
                                    <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                    <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                    <div className="w-6 h-6 bg-gray-700/50 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slider Loading Skeleton */}
                <div className="slider-block style-two bg-linear xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[350px] max-[420px]:h-[400px] w-full">
                    <div className="slider-main h-full w-full flex items-center">
                        <div className="container w-full h-full flex items-center relative">
                            <div className="text-content basis-1/2 flex flex-col items-start max-lg:items-center">
                                {/* Main headline skeleton */}
                                <div className="w-80 max-lg:w-72 h-12 bg-gray-200 rounded animate-pulse mb-6"></div>

                                {/* Subtext skeleton */}
                                <div className="space-y-3 mb-8">
                                    <div className="w-96 max-lg:w-80 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-80 max-lg:w-64 h-5 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* CTA button skeleton */}
                                <div className="w-40 h-12 bg-gray-300 rounded-xl animate-pulse"></div>
                            </div>

                            <div className="sub-img absolute sm:w-1/2 w-[54%] 2xl:-right-[60px] right-0 bottom-0">
                                <div className="w-full aspect-[670/936] bg-gray-200 rounded-2xl animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_2s_infinite]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Collection Loading Skeleton */}
            <div className="collection-block pt-5">
                <div className="list-collection section-swiper-navigation sm:px-5 px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="collection-item block relative h-[200px] sm:h-[250px] md:h-[300px] rounded-2xl overflow-hidden">
                                <div className="bg-img h-full bg-gray-200 animate-pulse relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                </div>
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                    <div className="w-24 md:w-32 h-8 bg-white/90 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* What's New Section Loading Skeleton */}
            <div className="whate-new-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="w-40 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="tab-item py-2 px-5">
                                    <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="product-item animate-pulse">
                                {/* Product Image */}
                                <div className="product-main bg-gray-200 rounded-lg aspect-[3/4] relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                    {/* Quick Actions */}
                                    <div className="absolute top-3 right-3 space-y-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="product-infor">
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Banner Section Loading Skeleton */}
            <div className="banner-block style-one grid sm:grid-cols-2 gap-5 md:pt-20 pt-10">
                <div className="banner-item relative block overflow-hidden">
                    <div className="banner-img h-[200px] sm:h-[300px] bg-gray-200 animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                    <div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="w-32 h-8 bg-white/20 rounded animate-pulse mb-2"></div>
                        <div className="w-24 h-6 bg-white/20 rounded animate-pulse"></div>
                    </div>
                </div>
                <div className="banner-item relative block overflow-hidden">
                    <div className="banner-img h-[200px] sm:h-[300px] bg-gray-200 animate-pulse relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                    </div>
                    <div className="banner-content absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
                        <div className="w-36 h-8 bg-white/20 rounded animate-pulse mb-2"></div>
                        <div className="w-24 h-6 bg-white/20 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Tab Features Section Loading Skeleton */}
            <div className="tab-features-block md:pt-20 pt-10">
                <div className="container">
                    <div className="heading flex flex-col items-center text-center">
                        <div className="menu-tab flex items-center gap-2 p-1 bg-surface rounded-2xl">
                            {['best sellers', 'on sale', 'new arrivals'].map((_, index) => (
                                <div key={index} className="tab-item py-2 px-5">
                                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="list-product grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px] md:mt-10 mt-6">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="product-item animate-pulse">
                                {/* Product Image */}
                                <div className="product-main bg-gray-200 rounded-lg aspect-[3/4] relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                    {/* Quick Actions */}
                                    <div className="absolute top-3 right-3 space-y-2">
                                        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                        <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <div className="product-infor">
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="flex items-center gap-1 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Benefits Section Loading Skeleton */}
            <div className="container">
                <div className="benefit-block md:mt-20 mt-10 py-10 px-2.5 bg-surface rounded-3xl">
                    <div className="list-benefit grid items-start lg:grid-cols-4 grid-cols-2 gap-[30px]">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="benefit-item flex flex-col items-center justify-center animate-pulse">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gray-200 rounded-full animate-pulse mb-5"></div>
                                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div className="space-y-2">
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Brand Section Loading Skeleton */}
            <div className="brand-block md:py-[60px] py-[32px]">
                <div className="container">
                    <div className="list-brand">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="brand-item relative flex items-center justify-center h-[36px]">
                                    <div className="w-full h-full bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Loading */}
            <div id="footer" className="footer">
                <div className="footer-main bg-surface">
                    <div className="container">
                        <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
                            {/* Company Info */}
                            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
                                <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>
                                <div className="mt-3 space-y-3">
                                    <div className="flex gap-3">
                                        <div className="space-y-3">
                                            <div className="h-4 bg-gray-300 rounded w-12 animate-pulse"></div>
                                            <div className="h-4 bg-gray-300 rounded w-16 animate-pulse"></div>
                                            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                                            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Content */}
                            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
                                {/* Navigation Links */}
                                <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="item flex flex-col basis-1/3">
                                            <div className="h-4 bg-gray-300 rounded w-20 animate-pulse mb-3"></div>
                                            <div className="space-y-2">
                                                {[...Array(4)].map((_, i) => (
                                                    <div key={i} className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Newsletter */}
                                <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                                    <div className="h-4 bg-gray-300 rounded w-20 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse mt-3"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse mt-1"></div>
                                    <div className="h-[52px] bg-gray-200 rounded-xl animate-pulse mt-4"></div>
                                    <div className="flex items-center gap-6 mt-4">
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Bottom */}
                        <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
                            <div className="left flex items-center gap-8">
                                <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
                                <div className="flex items-center gap-5 max-md:hidden">
                                    <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                                    <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                </div>
                            </div>
                            <div className="right flex items-center gap-2">
                                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="w-12 h-8 bg-gray-200 rounded-sm animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
