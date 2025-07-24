import React from 'react'

export default function DashboardLoading() {
    return (
        <div role="status" aria-busy="true" aria-label="Loading dashboard content">
            <span className="sr-only">Loading dashboard, please wait...</span>
            {/* Top Nav Loading */}
            <div className="w-full h-[44px] bg-gray-300 animate-pulse" aria-hidden="true"></div>

            {/* Header Section Loading */}
            <div className="relative w-full" aria-hidden="true">
                {/* Menu Loading */}
                <div className="h-[74px] bg-gray-200 animate-pulse">
                    <div className="container mx-auto h-full">
                        <div className="flex justify-between items-center h-full px-4">
                            {/* Logo */}
                            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>

                            {/* Navigation items */}
                            <div className="hidden lg:flex items-center gap-8">
                                <div className="h-6 w-16 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 w-20 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-6 w-18 bg-gray-300 rounded animate-pulse"></div>
                            </div>

                            {/* Right side icons */}
                            <div className="flex items-center gap-4">
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                                <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Breadcrumb Loading */}
                <div className="bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" aria-hidden="true">
                    <div className="container lg:pt-[134px] pt-24 pb-10">
                        <div className="flex flex-col items-center justify-center">
                            <div className="h-10 w-48 bg-gray-400 rounded animate-pulse mb-3"></div>
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-16 bg-gray-400 rounded animate-pulse"></div>
                                <div className="w-3 h-3 bg-gray-400 rounded animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-400 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Content Loading */}
            <div className="profile-block md:py-20 py-10" aria-hidden="true">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col w-full">
                        {/* Left Sidebar Loading */}
                        <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
                            <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl animate-pulse">
                                {/* User Profile Loading */}
                                <div className="heading flex flex-col items-center justify-center">
                                    <div className="md:w-[140px] w-[120px] md:h-[140px] h-[120px] rounded-full bg-gray-300 animate-pulse"></div>
                                    <div className="h-6 w-32 bg-gray-300 rounded mt-4 animate-pulse"></div>
                                    <div className="h-4 w-40 bg-gray-300 rounded mt-2 animate-pulse"></div>
                                </div>

                                {/* Menu Items Loading */}
                                <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                                    {[...Array(5)].map((_, index) => (
                                        <div key={index} className={`flex items-center gap-3 w-full px-5 py-4 rounded-lg ${index > 0 ? 'mt-1.5' : ''}`}>
                                            <div className="w-5 h-5 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Content Loading */}
                        <div className="right md:w-2/3 w-full pl-2.5">
                            {/* Dashboard Overview Cards Loading */}
                            <div className="overview grid sm:grid-cols-3 gap-5 mb-8">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs animate-pulse">
                                        <div className="counter">
                                            <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-8 w-16 bg-gray-300 rounded mt-2 animate-pulse"></div>
                                        </div>
                                        <div className="w-10 h-10 bg-gray-300 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Orders Section Loading */}
                            <div className="recent-orders">
                                <div className="h-7 w-40 bg-gray-300 rounded mb-5 animate-pulse"></div>

                                {/* Orders Table Loading */}
                                <div className="overflow-x-auto">
                                    <div className="min-w-full">
                                        {/* Table Header */}
                                        <div className="grid grid-cols-5 gap-4 p-4 border-b border-line">
                                            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-4 w-18 bg-gray-300 rounded animate-pulse"></div>
                                            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                                        </div>

                                        {/* Table Rows */}
                                        {[...Array(5)].map((_, index) => (
                                            <div key={index} className="grid grid-cols-5 gap-4 p-4 border-b border-line">
                                                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="h-6 w-20 bg-gray-300 rounded-full animate-pulse"></div>
                                                <div className="h-4 w-12 bg-gray-300 rounded animate-pulse"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* View All Link Loading */}
                                <div className="flex justify-center mt-6">
                                    <div className="h-10 w-32 bg-gray-300 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Recent Downloads Section Loading */}
                            <div className="recent-downloads mt-10">
                                <div className="h-7 w-44 bg-gray-300 rounded mb-5 animate-pulse"></div>

                                {/* Downloads List Loading */}
                                <div className="space-y-4">
                                    {[...Array(3)].map((_, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 border border-line rounded-lg">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-300 rounded animate-pulse"></div>
                                                <div className="space-y-2">
                                                    <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
                                                    <div className="h-3 w-24 bg-gray-300 rounded animate-pulse"></div>
                                                </div>
                                            </div>
                                            <div className="h-8 w-20 bg-gray-300 rounded animate-pulse"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Loading */}
            <div className="footer bg-surface animate-pulse" aria-hidden="true">
                <div className="container py-[60px]">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <div className="h-8 w-32 bg-gray-300 rounded animate-pulse"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-40 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 w-36 bg-gray-300 rounded animate-pulse"></div>
                                <div className="h-4 w-44 bg-gray-300 rounded animate-pulse"></div>
                            </div>
                        </div>

                        {/* Footer Links */}
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="space-y-4">
                                <div className="h-5 w-24 bg-gray-300 rounded animate-pulse"></div>
                                <div className="space-y-2">
                                    {[...Array(4)].map((_, linkIndex) => (
                                        <div key={linkIndex} className="h-4 w-20 bg-gray-300 rounded animate-pulse"></div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Bottom */}
                    <div className="flex justify-between items-center mt-8 pt-4 border-t border-line">
                        <div className="h-4 w-48 bg-gray-300 rounded animate-pulse"></div>
                        <div className="flex gap-2">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="w-12 h-8 bg-gray-300 rounded animate-pulse"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
