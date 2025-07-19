import ThankYouClient from '@/components/ThankYou/ThankYouClient';
import { getProductCategories } from '@/actions/data-actions';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import * as Icon from '@phosphor-icons/react/dist/ssr';
import React from 'react';

interface ThankYouPageProps {
    searchParams: { orderId?: string };
}

export async function generateMetadata(
    { searchParams }: ThankYouPageProps
): Promise<Metadata> {
    const { orderId } = await searchParams;

    if (!orderId) {
        return {
            title: 'Thank You for Your Order',
        };
    }

    return {
        title: `Order #${orderId} Confirmed - Woonex`,
        description: `Thank you for your order. Your order #${orderId} has been successfully placed.`,
        robots: { index: false, follow: false },
    };
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
    const { orderId } = await searchParams;

    if (!orderId) {
        notFound();
    }

    const categories = await getProductCategories();

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="Limited Offer: Free shipping on orders over $50" />
            <div id="header" className="relative w-full">
                <MenuOne props={"bg-transparent"} categories={categories} />
            </div>

            <ThankYouClient orderId={orderId} />

            <Footer />
        </>
    );
};

export default ThankYouPage;
