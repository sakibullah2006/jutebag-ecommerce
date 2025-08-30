import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function ShopLoading() {
    return (
        <>
            {/* Breadcrumb Loading Skeleton */}
            <div className="breadcrumb-block style-img">
                <div className="breadcrumb-main bg-gray-200 animate-pulse h-[200px] w-full"></div>
            </div>

            {/* Shop Content Loading Skeleton */}
            <div className="shop-product breadcrumb1 lg:py-20 md:py-14 py-10">
                <div className="container">
                    <div className="flex max-md:flex-wrap max-md:flex-col-reverse gap-y-8">
                        {/* Sidebar Loading */}
                        <div className="sidebar lg:w-1/4 md:w-1/3 w-full md:pr-12">
                            {/* Filter Type */}
                            <div className="filter-type pb-8 border-b border-line">
                                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="space-y-3">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Categories Loading */}
                            <div className="filter-type pb-8 border-b border-line mt-8">
                                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="space-y-3">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className={`h-4 bg-gray-200 rounded animate-pulse ${i % 2 === 0 ? 'w-20' : 'w-24'}`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div className="filter-size pb-8 border-b border-line mt-8">
                                <div className="w-12 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div className="filter-price pb-8 border-b border-line mt-8">
                                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="w-full h-2 bg-gray-200 rounded-full animate-pulse mt-5"></div>
                                <div className="flex justify-between mt-2">
                                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Color Filter */}
                            <div className="filter-color pb-8 border-b border-line mt-8">
                                <div className="w-14 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="flex flex-wrap gap-3">
                                    {[...Array(10)].map((_, i) => (
                                        <div key={i} className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Filter */}
                            <div className="filter-brand mt-8">
                                <div className="w-16 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="space-y-3">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className={`h-4 bg-gray-200 rounded animate-pulse ${i % 2 === 0 ? 'w-16' : 'w-20'}`}></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Product Grid Loading */}
                        <div className="list-product-block lg:w-3/4 md:w-2/3 w-full md:pl-3">
                            {/* Filter Heading */}
                            <div className="filter-heading flex items-center justify-between gap-5 flex-wrap mb-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-32 h-10 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Active Filters */}
                            <div className="list-filtered flex items-center gap-3 mt-4">
                                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="w-24 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                <div className="w-16 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>

                            {/* Product Grid */}
                            <div className="list-product grid lg:grid-cols-3 grid-cols-2 sm:gap-[30px] gap-[20px] mt-7">
                                {[...Array(9)].map((_, index) => (
                                    <div key={index} className="product-item animate-pulse">
                                        {/* Product Image */}
                                        <div className="product-main bg-gray-200 rounded-lg aspect-[3/4] relative overflow-hidden">
                                            <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                                            {/* Quick Actions */}
                                            <div className="absolute top-3 right-3 space-y-2">
                                                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="product-infor mt-4">
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

                            {/* Pagination */}
                            <div className="flex items-center justify-center mt-8">
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
        </>
    )
}
