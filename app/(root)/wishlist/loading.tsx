
import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function WishlistLoading() {
    return (
        <div role="status" aria-label="Loading wishlist content">
            {/* Breadcrumb Loading Skeleton */}
            <div id="header" className='relative w-full'>
                <div className="breadcrumb-block style-shared">
                    <div className="breadcrumb-main bg-linear overflow-hidden">
                        <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                <div className="text-content">
                                    <div className="w-32 h-12 bg-white/20 rounded animate-pulse mx-auto"></div>
                                    <div className="flex items-center justify-center gap-1 mt-3">
                                        <div className="w-16 h-4 bg-white/20 rounded animate-pulse"></div>
                                        <Icon.CaretRightIcon size={12} className='text-secondary2' />
                                        <div className="w-20 h-4 bg-white/20 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Wishlist Content Loading Skeleton */}
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="list-product-block relative">
                        {/* Filter Heading */}
                        <div className="filter-heading flex items-center justify-between gap-5 flex-wrap mb-4">
                            <div className="left flex has-line items-center flex-wrap gap-5">
                                {/* Layout Chooser */}
                                <div className="choose-layout flex items-center gap-2">
                                    {[1, 2].map((_, index) => (
                                        <div key={index} className="item p-2 border border-line rounded flex items-center justify-center">
                                            <div className="flex items-center gap-0.5">
                                                {[...Array(3 + index)].map((_, i) => (
                                                    <span key={i} className='w-[3px] h-4 bg-gray-200 rounded-sm animate-pulse'></span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="right flex items-center gap-3">
                                {/* Type Filter */}
                                <div className="select-block filter-type relative">
                                    <div className="w-24 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                                {/* Sort Filter */}
                                <div className="select-block relative">
                                    <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
                        </div>

                        {/* Active Filters */}
                        <div className="list-filtered flex items-center gap-3 mt-4">
                            <div className="total-product flex items-center">
                                <div className="w-8 h-5 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse ml-2"></div>
                            </div>
                            <div className='w-px h-4 bg-line'></div>
                            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>

                        {/* Product Grid Loading */}
                        <div className="list-product grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                            {[...Array(12)].map((_, index) => (
                                <div key={index} className="product-item animate-pulse">
                                    {/* Product Image */}
                                    <div className="product-main bg-gray-200 rounded-lg aspect-[3/4] relative overflow-hidden mb-4">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full "></div>

                                        {/* Quick Action Buttons */}
                                        <div className="absolute top-3 right-3 space-y-2">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                        </div>

                                        {/* Sale Badge */}
                                        <div className="absolute top-3 left-3">
                                            <div className="w-12 h-6 bg-gray-300 rounded animate-pulse"></div>
                                        </div>

                                        {/* Wishlist Heart Icon */}
                                        <div className="absolute bottom-3 right-3">
                                            <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
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
                                            <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mt-2">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                                            ))}
                                            <div className="w-8 h-3 bg-gray-200 rounded animate-pulse ml-2"></div>
                                        </div>

                                        {/* Add to Cart Button */}
                                        <div className="w-full h-10 bg-gray-200 rounded-lg animate-pulse mt-3"></div>
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
        </div>
    )
}
