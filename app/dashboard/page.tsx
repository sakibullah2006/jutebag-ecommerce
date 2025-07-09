import React from 'react'
import { redirect } from 'next/navigation'
import { fetchProfileData } from '@/actions/customer-action'
import DashboardClient from '@/components/Dashboard/DashboardClient'
import { cookies } from 'next/headers'
import TopNavOne from '../../components/Header/TopNav/TopNavOne'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Footer from '../../components/Footer/Footer'
import MenuOne from '../../components/Header/Menu/MenuOne'

interface DashboardPageProps {
    searchParams: { tab?: string; userId?: string }
}

const Dashboard = async ({ searchParams }: DashboardPageProps) => {
    const { tab = 'dashboard' } = searchParams

    // Get userId from cookies (JWT token contains user info)
    const cookieStore = await cookies()
    const userCookie = cookieStore.get('user')

    if (!userCookie) {
        redirect('/login')
    }

    try {
        const userData = JSON.parse(userCookie.value)
        const userId = userData.user_id

        if (!userId) {
            redirect('/login')
        }

        // Fetch all required data server-side
        const profileData = await fetchProfileData(userId)

        return (
            <>
                <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
                <div id="header" className='relative w-full'>
                    <MenuOne props="bg-transparent" />
                    <Breadcrumb heading='My Account' subHeading='My Account' />
                </div>
                <DashboardClient
                    initialTab={tab}
                    profileData={profileData}
                    userId={userId}
                />
                <Footer />
            </>
        )
    } catch (error) {
        console.error('Error fetching profile data:', error)
        redirect('/login')
    }
}

export default Dashboard