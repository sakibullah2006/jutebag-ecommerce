import ThankYouClient from '@/components/ThankYou/ThankYouClient';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProductCategories } from '@/actions/data-actions';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';

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

            <div className="thank-you-block relative pt-20 pb-20">
                <div className="container mx-auto">
                    <ThankYouClient orderId={orderId} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ThankYouPage;
