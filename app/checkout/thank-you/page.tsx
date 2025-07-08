import React from 'react'
import { getOrder } from '@/actions/order-actions'
import { getCurrentCurrency } from '@/actions/data-actions'
import ThankYouClient from '@/components/ThankYou/ThankYouClient'
import { notFound } from 'next/navigation'

interface ThankYouPageProps {
    searchParams: { orderId?: string }
}

const ThankYou = async ({ searchParams }: ThankYouPageProps) => {
    const { orderId } = await searchParams

    if (!orderId) {
        notFound()
    }

    try {
        // Fetch order and currency data
        const [orderData] = await Promise.all([
            getOrder(orderId),
        ])

        if (!orderData) {
            notFound()
        }

        return (
            <ThankYouClient
                orderData={orderData}
            />
        )
    } catch (error) {
        console.error('Error fetching order:', error)
        notFound()
    }
}

export default ThankYou
