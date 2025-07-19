'use client'

import { useCart } from "@/context/CartContext";
import * as Icon from '@phosphor-icons/react/dist/ssr';
import Link from "next/link";
import { useEffect } from "react";
import { PATH } from "../../constant/pathConstants";

interface ThankYouClientProps {
    orderId: string;
}

const ThankYouClient: React.FC<ThankYouClientProps> = ({ orderId }) => {
    const { clearCart } = useCart();

    useEffect(() => {
        clearCart();
    }, []);

    return (
        <div className="content-main max-w-2xl mx-auto py-10 px-4 text-center">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon.CheckCircle size={32} className="text-green-600" />
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
                <Link href={`${PATH.SHOP}`} className="button-main">Continue Shopping</Link>
                <Link href={`${PATH.DASHBOARD}?tab=orders`} className="button-main bg-white border border-black text-black hover:bg-black hover:text-white">View Order History</Link>
            </div>
        </div>
    )
}

export default ThankYouClient;
