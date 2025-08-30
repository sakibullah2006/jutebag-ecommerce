// page.tsx

import { checkOrderExists } from '@/actions/order-actions'; // Adjust the import path as needed
import { getProductCategories } from '@/actions/data-actions';
import Footer from '@/components/Footer/Footer';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import ThankYouClient from '@/components/ThankYou/ThankYouClient';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MenuEight from '../../../components/Header/Menu/MenuEight';

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
            robots: { index: false, follow: false },
        };
    }

    // Validate the order ID before generating metadata
    const order = await checkOrderExists(parseInt(orderId, 10));
    if (!order) {
        notFound();
    }

    return {
        title: `Order #${order.id} Confirmed - Vertex`,
        description: `Thank you for your order. Your order #${order.id} has been successfully placed.`,
        robots: { index: false, follow: false },
    };
}

const ThankYouPage = async ({ searchParams }: ThankYouPageProps) => {
    const { orderId } = await searchParams;

    if (!orderId) {
        notFound();
    }

    const [order, categories] = await Promise.all([
        checkOrderExists(parseInt(orderId, 10)),
        getProductCategories(),
    ]);

    if (!order) {
        notFound();
    }



    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="Limited Offer: Free shipping on orders over $50" />
            <div id="header" className="relative w-full">
                <MenuEight props={"bg-transparent"} categories={categories} />
            </div>

            {/* <ThankYouClient orderId={orderId} /> */}
            <ThankYouClient order={order} />

            <Footer />
        </>
    );
};

export default ThankYouPage;