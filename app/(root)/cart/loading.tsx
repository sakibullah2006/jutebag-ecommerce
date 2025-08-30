import * as Icon from "@phosphor-icons/react/dist/ssr";

export default function CartLoading() {
    return (
        <div role="status" aria-label="Loading cart content">
            {/* Breadcrumb Loading Skeleton */}
            <div id="header" className='relative w-full'>
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
                                                        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 -translate-x-full"></div>
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
        </div>
    )
}
