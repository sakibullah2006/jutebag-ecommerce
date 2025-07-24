import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function ProductLoading() {
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

            <div id="header" className="relative w-full">
                {/* Header Loading Skeleton */}
                <div className="header-menu style-one absolute top-0 left-0 right-0 w-full md:h-[74px] h-[56px] bg-white">
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full">
                            <div className="menu-mobile-icon lg:hidden flex items-center">
                                <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                            <div className="left flex items-center gap-16">
                                <div className='flex items-center max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2'>
                                    <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="menu-main h-full max-lg:hidden">
                                    <ul className='flex items-center gap-8 h-full'>
                                        <li className='h-full'>
                                            <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                                        </li>
                                        <li className='h-full'>
                                            <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="right flex gap-12">
                                <div className="max-md:hidden search-icon flex items-center cursor-pointer relative">
                                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="line absolute bg-line w-px h-6 -right-6"></div>
                                </div>
                                <div className="list-action flex items-center gap-4">
                                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breadcrumb Loading Skeleton */}
                <div className="breadcrumb-product">
                    <div className="main bg-surface md:pt-[88px] pt-[70px] pb-[14px]">
                        <div className="container flex items-center justify-between flex-wrap gap-3">
                            <div className="left flex items-center gap-1">
                                <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <Icon.CaretRightIcon size={12} className='text-secondary2' />
                                <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <Icon.CaretRightIcon size={12} className='text-secondary2' />
                                <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Detail Loading Skeleton */}
            <div className="product-detail default">
                <div className="container">
                    <div className="flex justify-between max-lg:flex-col-reverse gap-y-8 pt-20">
                        {/* Product Images Section */}
                        <div className="list-img md:w-1/2 md:pr-[45px] w-full">
                            {/* Main Product Image */}
                            <div className="bg-img w-full aspect-[3/4] bg-gray-200 rounded-lg animate-pulse relative overflow-hidden mb-4">
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full"></div>
                            </div>

                            {/* Thumbnail Images */}
                            <div className="list-img-small flex items-center justify-center gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="img-small-item w-[112px] aspect-square bg-gray-200 rounded animate-pulse relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Product Information Section */}
                        <div className="product-infor md:w-1/2 w-full lg:pl-[15px] md:pl-2">
                            <div className="flex justify-between">
                                <div className="w-full">
                                    {/* Product Category */}
                                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>

                                    {/* Product Name */}
                                    <div className="w-full h-8 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>

                                    {/* Rating */}
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            ))}
                                        </div>
                                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
                                    </div>

                                    {/* Short Description */}
                                    <div className="space-y-2 mb-6">
                                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>

                                    {/* Color Options */}
                                    <div className="choose-color mb-4">
                                        <div className="w-16 h-5 bg-gray-200 rounded animate-pulse mb-3"></div>
                                        <div className="list-color flex items-center gap-2">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Size Options */}
                                    <div className="choose-size mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="w-12 h-5 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="list-size flex items-center gap-2">
                                            {['XS', 'S', 'M', 'L', 'XL'].map((_, i) => (
                                                <div key={i} className="size-item w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Quantity and Add to Cart */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="quantity-block flex items-center border border-gray-200 rounded">
                                            <div className="w-12 h-12 bg-gray-200 animate-pulse"></div>
                                            <div className="w-16 h-12 bg-gray-200 animate-pulse"></div>
                                            <div className="w-12 h-12 bg-gray-200 animate-pulse"></div>
                                        </div>
                                        <div className="w-40 h-12 bg-gray-200 rounded animate-pulse"></div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-32 h-12 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-12 h-12 bg-gray-200 rounded animate-pulse"></div>
                                    </div>

                                    {/* Product Details */}
                                    <div className="product-details space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Tabs Section */}
                    <div className="desc-tab md:pt-20 pt-10">
                        <div className="desc-block">
                            <div className="menu-tab flex items-center md:gap-[60px] gap-8 border-b border-line w-fit">
                                {['Description', 'Size Guide', 'Shipping', 'Reviews'].map((tab, i) => (
                                    <div key={i} className="w-20 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="desc-item mt-8 space-y-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                                ))}
                                <div className="w-2/3 h-4 bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products Section */}
                    <div className="related-product md:pt-20 pt-10">
                        <div className="heading3 text-center mb-10">
                            <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mx-auto"></div>
                        </div>
                        <div className="list-product grid lg:grid-cols-4 grid-cols-2 sm:gap-[30px] gap-[20px]">
                            {[...Array(4)].map((_, index) => (
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
