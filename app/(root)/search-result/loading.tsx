import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function SearchResultLoading() {
    return (
        <>
            {/* Breadcrumb Loading Skeleton */}
            <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main bg-linear overflow-hidden">
                    <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                        <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                            <div className="text-content">
                                <div className="w-48 h-12 bg-white/20 rounded animate-pulse mx-auto"></div>
                                <div className="flex items-center justify-center gap-1 mt-3">
                                    <div className="w-12 h-4 bg-white/20 rounded animate-pulse"></div>
                                    <Icon.CaretRightIcon size={14} className='text-secondary2' />
                                    <div className="w-12 h-4 bg-white/20 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search Results Content Loading Skeleton */}
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="heading flex flex-col items-center">
                        {/* Search Results Title */}
                        <div className="w-80 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>

                        {/* Search Input */}
                        <div className="input-block lg:w-1/2 sm:w-3/5 w-full md:h-[52px] h-[44px] sm:mt-8 mt-5">
                            <div className='w-full h-full relative bg-gray-200 rounded-xl animate-pulse'>
                                <div className="absolute top-1 bottom-1 right-1">
                                    <div className="w-20 md:w-28 h-full bg-gray-300 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="list-product-block relative md:pt-10 pt-6">
                        {/* Search Query Title */}
                        <div className="w-48 h-6 bg-gray-200 rounded animate-pulse mb-5"></div>

                        {/* Product Grid Loading */}
                        <div className="list-product grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-5">
                            {[...Array(8)].map((_, index) => (
                                <div key={index} className="product-item animate-pulse">
                                    {/* Product Image */}
                                    <div className="product-main bg-gray-200 rounded-lg aspect-[3/4] relative overflow-hidden mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>

                                        {/* Quick Action Buttons */}
                                        <div className="absolute top-3 right-3 space-y-2">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                        </div>

                                        {/* Sale Badge */}
                                        <div className="absolute top-3 left-3">
                                            <div className="w-12 h-6 bg-gray-300 rounded animate-pulse"></div>
                                        </div>
                                    </div>

                                    {/* Product Information */}
                                    <div className="product-infor">
                                        {/* Category */}
                                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

                                        {/* Product Title */}
                                        <div className="w-full h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="w-3/4 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                                            ))}
                                            <div className="w-8 h-3 bg-gray-200 rounded animate-pulse ml-2"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Loading */}
                        <div className="list-pagination flex items-center justify-center md:mt-10 mt-7">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
