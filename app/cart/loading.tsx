import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function CartLoading() {
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
                <div className="breadcrumb-block style-shared">
                    <div className="breadcrumb-main bg-linear overflow-hidden">
                        <div className="container lg:pt-[134px] pt-24 pb-10 relative">
                            <div className="main-content w-full h-full flex flex-col items-center justify-center relative z-[1]">
                                <div className="text-content">
                                    <div className="w-48 h-12 bg-white/20 rounded animate-pulse mx-auto"></div>
                                    <div className="flex items-center justify-center gap-1 mt-3">
                                        <div className="w-20 h-4 bg-white/20 rounded animate-pulse"></div>
                                        <Icon.CaretRightIcon size={12} className='text-secondary2' />
                                        <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cart Content Loading Skeleton */}
            <div className="cart-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex justify-between max-xl:flex-col gap-y-8">
                        {/* Left Side - Cart Items */}
                        <div className="xl:w-2/3 xl:pr-3 w-full">
                            <div className="list-product w-full sm:mt-7 mt-5">
                                <div className='w-full'>
                                    {/* Cart Header */}
                                    <div className="heading bg-surface bora-4 pt-4 pb-4">
                                        <div className="grid grid-cols-12 gap-4 px-4">
                                            <div className="col-span-6">
                                                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                            <div className="col-span-2 flex justify-center">
                                                <div className="w-12 h-4 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cart Items */}
                                    <div className="list-product-main w-full mt-3">
                                        {[...Array(3)].map((_, index) => (
                                            <div key={index} className="product-item grid grid-cols-12 gap-4 py-5 border-b border-line">
                                                {/* Product Image & Info */}
                                                <div className="col-span-6 flex items-center gap-4">
                                                    <div className="bg-img w-[100px] aspect-square bg-gray-200 rounded animate-pulse relative overflow-hidden">
                                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full animate-[shimmer_1.5s_infinite]"></div>
                                                    </div>
                                                    <div className="product-infor">
                                                        <div className="w-32 h-5 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                        <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                                    </div>
                                                </div>

                                                {/* Quantity */}
                                                <div className="col-span-2 flex items-center justify-center">
                                                    <div className="quantity-block flex items-center border border-gray-200 rounded">
                                                        <div className="w-8 h-8 bg-gray-200 animate-pulse"></div>
                                                        <div className="w-12 h-8 bg-gray-200 animate-pulse"></div>
                                                        <div className="w-8 h-8 bg-gray-200 animate-pulse"></div>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="col-span-2 flex items-center justify-center">
                                                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                </div>

                                                {/* Total & Remove */}
                                                <div className="col-span-2 flex items-center justify-center gap-2">
                                                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Discount Code Section */}
                            <div className="input-block discount-code w-full h-12 sm:mt-7 mt-5">
                                <div className='w-full h-full relative bg-gray-200 rounded-lg animate-pulse'>
                                    <div className="absolute top-1 bottom-1 right-1">
                                        <div className="w-20 h-full bg-gray-300 rounded-lg animate-pulse"></div>
                                    </div>
                                </div>
                                {/* Coupon Message Placeholder */}
                                <div className="w-full h-12 bg-gray-200 rounded animate-pulse mt-2"></div>
                            </div>
                        </div>

                        {/* Right Side - Order Summary */}
                        <div className="xl:w-1/3 xl:pl-12 w-full">
                            <div className="checkout-block bg-surface p-6 rounded-2xl">
                                {/* Order Summary Title */}
                                <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-5"></div>

                                {/* Subtotal */}
                                <div className="total-block py-5 flex justify-between border-b border-line">
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* Discounts */}
                                <div className="discount-block py-5 flex justify-between border-b border-line">
                                    <div className="flex gap-2 items-center">
                                        <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* Shipping */}
                                <div className="ship-block py-5 flex justify-between border-b border-line">
                                    <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* Total */}
                                <div className="total-cart-block pt-4 pb-4 flex justify-between">
                                    <div className="w-12 h-5 bg-gray-300 rounded animate-pulse"></div>
                                    <div className="w-20 h-5 bg-gray-300 rounded animate-pulse"></div>
                                </div>

                                {/* Checkout Buttons */}
                                <div className="block-button flex flex-col items-center gap-y-4 mt-5">
                                    <div className="w-full h-12 bg-gray-300 rounded-lg animate-pulse"></div>
                                    <div className="w-full h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                                </div>
                            </div>
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
