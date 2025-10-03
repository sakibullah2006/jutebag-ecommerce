'use client'

import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Customer, DownloadData } from '@/types/customer-type'
import { OrderType } from '@/types/order-type'
import * as Icon from "@phosphor-icons/react/dist/ssr"

interface DashboardOverviewProps {
    customer: Customer
    orders: OrderType[]
    downloads: DownloadData[]
}

const DashboardOverview = React.memo(({ customer, orders, downloads }: DashboardOverviewProps) => {
    // Memoize calculations to prevent recalculation on every render
    const orderStats = useMemo(() => {
        const awaitingPickup = orders.filter(order => order.status === 'processing').length
        const cancelledOrders = orders.filter(order => order.status === 'cancelled').length
        const totalOrders = orders.length
        const recentOrders = orders.slice(0, 5)

        return { awaitingPickup, cancelledOrders, totalOrders, recentOrders }
    }, [orders])

    const getStatusColor = useMemo(() => (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-200 text-yellow-600'
            case 'processing': return 'bg-blue-200 text-blue-500'
            case 'completed': return 'bg-green-200 text-green-900'
            case 'cancelled': return 'bg-red-200 text-red-900'
            default: return 'bg-gray text-gray'
        }
    }, [])

    return (
        <div className="tab text-content w-full">
            <div className="overview grid sm:grid-cols-3 gap-5">
                <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
                    <div className="counter">
                        <span className="text-secondary">Processing Orders</span>
                        <h5 className="heading5 mt-1">{orderStats.awaitingPickup}</h5>
                    </div>
                    <Icon.HourglassIcon className='text-4xl text-blue-500' />
                </div>
                <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
                    <div className="counter">
                        <span className="text-secondary">Cancelled Orders</span>
                        <h5 className="heading5 mt-1">{orderStats.cancelledOrders}</h5>
                    </div>
                    <Icon.XCircleIcon className='text-4xl text-red-500' />
                </div>
                <div className="item flex items-center justify-between p-5 border border-line rounded-lg box-shadow-xs">
                    <div className="counter">
                        <span className="text-secondary">Total Orders</span>
                        <h5 className="heading5 mt-1">{orderStats.totalOrders}</h5>
                    </div>
                    <Icon.PackageIcon className='text-4xl text-green-500' />
                </div>
            </div>

            {orderStats.recentOrders.length > 0 && (
                <div className="recent_order pt-5 px-5 pb-2 mt-7 border border-line rounded-xl">
                    <h6 className="heading6">Recent Orders</h6>
                    <div className="list overflow-x-auto w-full mt-5">
                        <table className="w-full max-[1400px]:w-[700px] max-md:w-[700px]">
                            <thead className="border-b border-line">
                                <tr>
                                    <th scope="col" className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap">Order</th>
                                    <th scope="col" className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap">Date</th>
                                    <th scope="col" className="pb-3 text-left text-sm font-bold uppercase text-secondary whitespace-nowrap">Total</th>
                                    <th scope="col" className="pb-3 text-right text-sm font-bold uppercase text-secondary whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderStats.recentOrders.map((order: OrderType) => (
                                    <tr key={order.id} className="item duration-300 border-b border-line">
                                        <th scope="row" className="py-3 text-left">
                                            <strong className="text-title">#{order.id}</strong>
                                        </th>
                                        <td className="py-3">
                                            <span className="text-secondary">
                                                {new Date(order.date_created).toLocaleDateString()}
                                            </span>
                                        </td>
                                        <td className="py-3">
                                            <span className="text-title">{order.currency_symbol}{order.total}</span>
                                        </td>
                                        <td className="py-3 text-right">
                                            <span className={`tag px-4 py-1.5 rounded-full bg-opacity-80 caption1 font-semibold ${getStatusColor(order.status)}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {downloads.length > 0 && (
                <div className="downloads_section pt-5 px-5 pb-2 mt-7 border border-line rounded-xl">
                    <h6 className="heading6">Downloads</h6>
                    <div className="list mt-5">
                        {downloads.slice(0, 3).map((download) => (
                            <div key={download.download_id} className="download-item flex items-center justify-between py-3 border-b border-line last:border-b-0">
                                <div className="info">
                                    <div className="product-name text-title">{download.product_name}</div>
                                    <div className="file-name text-secondary text-sm">{download.download_name}</div>
                                </div>
                                <div className="actions">
                                    <Link
                                        href={download.download_url}
                                        className="btn btn-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800"
                                    >
                                        Download
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
})

DashboardOverview.displayName = 'DashboardOverview'

export default DashboardOverview
