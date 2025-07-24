import React from 'react'

export default function CheckoutLoading() {
    return (
        <div role="status" aria-label="Loading checkout content">
            {/* Header Section Loading */}
            <div id="header" className="relative w-full">
                <div className="header-menu style-one fixed top-0 left-0 right-0 w-full md:h-[74px] h-[56px] bg-gray-200 animate-pulse">
                    <div className="container mx-auto h-full">
                        <div className="header-main flex items-center justify-between h-full px-4">
                            {/* Logo */}
                            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>

                            {/* Navigation (hidden on mobile) */}
                            <div className="hidden lg:flex items-center gap-8">
                                <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
                            </div>

                            {/* Right side icons */}
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Checkout Content Loading */}
            <div className="checkout-block relative md:pt-[74px] pt-[56px] mb-10">
                <div className="content-main flex max-lg:flex-col-reverse justify-between">
                    {/* Left Column - Checkout Form */}
                    <div className="left flex lg:justify-end w-full">
                        <div className="lg:max-w-[716px] flex-shrink-0 w-full lg:pt-20 pt-12 lg:pr-[70px] pl-[16px] max-lg:pr-[16px]">

                            {/* Order Notes Section */}
                            <div className="mt-8 animate-pulse">
                                <div className="h-5 w-48 bg-gray-300 rounded mb-2"></div>
                                <div className="h-20 w-full bg-gray-300 rounded-lg"></div>
                            </div>

                            {/* Contact Section */}
                            <div className="login flex justify-between gap-4 mt-8 animate-pulse">
                                <div className="h-7 w-20 bg-gray-300 rounded"></div>
                                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                            </div>

                            {/* Contact Form Fields */}
                            <div className="mt-5 space-y-5 animate-pulse">
                                <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                                    <div className="h-4 w-48 bg-gray-300 rounded"></div>
                                </div>
                                <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                            </div>

                            {/* Delivery Section */}
                            <div className="information md:mt-10 mt-6 animate-pulse">
                                <div className="h-6 w-16 bg-gray-300 rounded mb-5"></div>

                                {/* Delivery Form Fields */}
                                <div className="form-checkout mt-5">
                                    <div className="grid sm:grid-cols-2 gap-4 gap-y-5">
                                        {/* Country Dropdown */}
                                        <div className="col-span-full">
                                            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                        </div>

                                        {/* First Name, Last Name */}
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>

                                        {/* Address */}
                                        <div className="col-span-full">
                                            <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                        </div>

                                        {/* Apartment, City */}
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>

                                        {/* State, ZIP */}
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                        <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Methods Section */}
                            <div className="shipping-block md:mt-10 mt-6 animate-pulse">
                                <div className="h-6 w-32 bg-gray-300 rounded mb-5"></div>
                                <div className="space-y-3">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                                            <div className="flex items-center gap-3">
                                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                                            </div>
                                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Payment Section */}
                            <div className="payment-block md:mt-10 mt-6 animate-pulse">
                                <div className="h-6 w-20 bg-gray-300 rounded mb-5"></div>
                                <div className="space-y-3">
                                    {[...Array(2)].map((_, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 border border-gray-300 rounded-lg">
                                            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                            <div className="h-4 w-32 bg-gray-300 rounded"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="complete-order-btn-block md:mt-10 mt-6 animate-pulse">
                                <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="right justify-start flex-shrink-0 lg:w-[47%] bg-surface lg:py-20 py-12">
                        <div className="lg:sticky lg:top-24 h-fit lg:max-w-[606px] w-full flex-shrink-0 lg:pl-[80px] pr-[16px] max-lg:pl-[16px]">

                            {/* Product List */}
                            <div className="list_prd flex flex-col gap-7 animate-pulse">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="item flex items-center justify-between gap-6">
                                        <div className="flex items-center gap-6">
                                            {/* Product Image */}
                                            <div className="relative flex-shrink-0 w-[100px] h-[100px]">
                                                <div className="w-full h-full bg-gray-300 rounded-lg"></div>
                                                <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-gray-400"></div>
                                            </div>
                                            {/* Product Details */}
                                            <div className="space-y-2">
                                                <div className="h-5 w-32 bg-gray-300 rounded"></div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                                                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Price */}
                                        <div className="flex flex-col gap-1">
                                            <div className="h-4 w-16 bg-gray-300 rounded"></div>
                                            <div className="h-5 w-20 bg-gray-300 rounded"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Discount Code Form */}
                            <div className="form_discount flex gap-3 mt-8 animate-pulse">
                                <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
                                <div className="h-12 w-20 bg-gray-300 rounded-lg flex-shrink-0"></div>
                            </div>

                            {/* Order Summary */}
                            <div className="order-summary mt-8 space-y-4 animate-pulse">
                                {/* Subtotal */}
                                <div className="flex items-center justify-between">
                                    <div className="h-5 w-16 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-20 bg-gray-300 rounded"></div>
                                </div>

                                {/* Shipping */}
                                <div className="flex items-center justify-between">
                                    <div className="h-5 w-20 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                                </div>

                                {/* Tax (if applicable) */}
                                <div className="flex items-center justify-between">
                                    <div className="h-5 w-12 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-300 rounded"></div>
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-300">
                                    <div className="h-6 w-16 bg-gray-300 rounded"></div>
                                    <div className="flex items-end gap-2">
                                        <div className="h-4 w-8 bg-gray-300 rounded"></div>
                                        <div className="h-6 w-20 bg-gray-300 rounded"></div>
                                    </div>
                                </div>

                                {/* Savings (if applicable) */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-28 bg-gray-300 rounded"></div>
                                    <div className="h-5 w-16 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Loading */}
            <div className="footer bg-surface animate-pulse">
                <div className="container py-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="h-8 w-32 bg-gray-300 rounded"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-300 rounded"></div>
                                <div className="h-4 w-36 bg-gray-300 rounded"></div>
                                <div className="h-4 w-44 bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        {/* Footer Links */}
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="space-y-4">
                                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, linkIndex) => (
                                        <div key={linkIndex} className="h-4 w-20 bg-gray-300 rounded"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Bottom */}
                    <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-300">
                        <div className="h-4 w-48 bg-gray-300 rounded"></div>
                        <div className="flex gap-2">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="w-12 h-8 bg-gray-300 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}