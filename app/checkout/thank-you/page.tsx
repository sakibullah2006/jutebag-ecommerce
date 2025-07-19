import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import * as Icon from '@phosphor-icons/react/dist/ssr';
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
    const { orderId } = searchParams;

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
    const { orderId } = searchParams;

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
                    <div className="content-main max-w-2xl mx-auto py-10 px-4 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                <Icon.CheckCircleIcon size={32} className="text-green-600" />
                            </div>
                        </div>
                        <h1 className="heading2 mb-4">Thank You for Your Order!</h1>
                        <p className="body1 text-secondary2 mb-6">
                            Your order has been successfully placed. We&apos;ve sent a confirmation email to you with the details.
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">Order Number:</span>
                                <span className="bg-black text-white px-3 py-1 rounded">#{orderId}</span>
                            </div>
                        </div>
                        <div className="flex justify-center gap-4 mt-8">
                            <Link href="/shop" className="button-main">Continue Shopping</Link>
                            <Link href="/dashboard" className="button-main bg-white border border-black text-black hover:bg-black hover:text-white">View Order History</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ThankYouPage;
