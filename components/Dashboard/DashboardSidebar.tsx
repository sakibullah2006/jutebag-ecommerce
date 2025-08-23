'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Customer } from '@/types/customer-type'
import * as Icon from "@phosphor-icons/react/dist/ssr"

interface DashboardSidebarProps {
    customer: Customer
    activeTab: string
    setActiveTab: (tab: string) => void
}

const DashboardSidebar = ({ customer, activeTab, setActiveTab }: DashboardSidebarProps) => {
    const { logout } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        params.set('tab', activeTab)
        const newUrl = `${window.location.pathname}?${params.toString()}`
        router.replace(newUrl)
    }, [activeTab, router])

    const handleLogout = () => {
        logout()
    }

    return (
        <div className="left md:w-1/3 w-full xl:pr-[3.125rem] lg:pr-[28px] md:pr-[16px]">
            <div className="user-infor bg-surface lg:px-7 px-4 lg:py-10 py-5 md:rounded-[20px] rounded-xl">
                <div className="heading flex flex-col items-center justify-center">
                    <div className="avatar">
                        <Image
                            src={customer.avatar_url || '/images/avatar/1.png'}
                            width={300}
                            height={300}
                            alt='avatar'
                            className='md:w-[140px] w-[120px] md:h-[140px] h-[120px] rounded-full object-cover'
                        />
                    </div>
                    <div className="name heading6 mt-4 text-center">
                        {customer.first_name} {customer.last_name}
                    </div>
                    <div className="mail heading6 font-normal normal-case text-secondary text-center mt-1">
                        {customer.email}
                    </div>
                </div>
                <div className="menu-tab w-full max-w-none lg:mt-10 mt-6">
                    <button
                        className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white ${activeTab === 'dashboard' ? 'active bg-white' : ''}`}
                        onClick={() => setActiveTab('dashboard')}
                    >
                        <Icon.HouseIcon size={20} />
                        <strong className="heading6">Dashboard</strong>
                    </button>
                    <button
                        className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${activeTab === 'orders' ? 'active bg-white' : ''}`}
                        onClick={() => setActiveTab('orders')}
                    >
                        <Icon.PackageIcon size={20} />
                        <strong className="heading6">Order History</strong>
                    </button>
                    <button
                        className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${activeTab === 'address' ? 'active bg-white' : ''}`}
                        onClick={() => setActiveTab('address')}
                    >
                        <Icon.MapPinIcon size={20} />
                        <strong className="heading6">My Address</strong>
                    </button>
                    <button
                        className={`item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5 ${activeTab === 'setting' ? 'active bg-white' : ''}`}
                        onClick={() => setActiveTab('setting')}
                    >
                        <Icon.GearIcon size={20} />
                        <strong className="heading6">Settings</strong>
                    </button>
                    <button
                        onClick={handleLogout}
                        className="item flex items-center gap-3 w-full px-5 py-4 rounded-lg cursor-pointer duration-300 hover:bg-white mt-1.5"
                    >
                        <Icon.SignOutIcon size={20} />
                        <strong className="heading6">Logout</strong>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar
