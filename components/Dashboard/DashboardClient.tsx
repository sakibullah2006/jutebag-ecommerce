'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import DashboardSidebar from './DashboardSidebar'
import DashboardOverview from './DashboardOverview'
import OrderHistory from './OrderHistory'
import AddressBook from './AddressBook'
import AccountSettings from './AccountSettings'
import { Customer, DownloadData } from '@/types/customer-type'
import { OrderType } from '@/types/order-type'

interface DashboardClientProps {
    initialTab: string
    profileData: {
        customer: Customer
        orders: OrderType[]
        downloads: DownloadData[]
    }
    userId: number
}

const DashboardClient = ({ initialTab, profileData, userId }: DashboardClientProps) => {
    const [customerData, setCustomerData] = useState<Customer>(profileData.customer)
    const { user, isAuthenticated, loading } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // Get current tab from URL, fallback to initialTab
    const activeTab = searchParams.get('tab') || initialTab

    // Memoized callback to handle customer data updates from child components
    const handleCustomerUpdate = useCallback((updatedCustomer: Customer) => {
        setCustomerData(updatedCustomer)
    }, [])

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login')
        }
    }, [isAuthenticated, loading, router])

    // Memoize tab content to prevent unnecessary re-renders
    const tabContent = useMemo(() => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <DashboardOverview
                        customer={customerData}
                        orders={profileData.orders}
                        downloads={profileData.downloads}
                    />
                )
            case 'orders':
                return (
                    <OrderHistory
                        orders={profileData.orders}
                        customerId={userId}
                    />
                )
            case 'address':
                return (
                    <AddressBook
                        customer={customerData}
                        customerId={userId}
                        onCustomerUpdate={handleCustomerUpdate}
                    />
                )
            case 'setting':
                return (
                    <AccountSettings
                        customer={customerData}
                        customerId={userId}
                        onCustomerUpdate={handleCustomerUpdate}
                    />
                )
            default:
                return (
                    <DashboardOverview
                        customer={customerData}
                        orders={profileData.orders}
                        downloads={profileData.downloads}
                    />
                )
        }
    }, [activeTab, customerData, profileData.orders, profileData.downloads, userId, handleCustomerUpdate])

    // Show loading while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        )
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null
    }

    return (
        <>
            <div className="profile-block md:py-20 py-10">
                <div className="container">
                    <div className="content-main flex gap-y-8 max-md:flex-col w-full">
                        <DashboardSidebar
                            customer={customerData}
                            activeTab={activeTab}
                        />
                        <div className="right md:w-2/3 w-full pl-2.5">
                            {tabContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardClient
