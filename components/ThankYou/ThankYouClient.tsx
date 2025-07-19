// ThankYouClient.tsx

'use client'

import { useCart } from "@/context/CartContext";
import { CheckedOrder } from "@/actions/order-actions"; // Import the type
import * as Icon from '@phosphor-icons/react/dist/ssr';
import { format } from 'date-fns'; // For formatting the date
import Link from "next/link";
import { useEffect } from "react";
import { PATH } from "../../constant/pathConstants";

interface ThankYouClientProps {
    order: CheckedOrder; // Update props to accept the full order object
}

const ThankYouClient: React.FC<ThankYouClientProps> = ({ order }) => {
    const { clearCart } = useCart();

    useEffect(() => {
        // This effect runs when the component mounts to clear the cart
        clearCart();
    }, []);

    return (
        <div className="content-main max-w-2xl my-10 mx-auto py-10 px-4 text-center">
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Icon.CheckCircle size={32} className="text-green-600" />
                </div>
            </div>
            <h1 className="heading2 mb-4">Thank You for Your Order!</h1>
            <p className="body1 text-secondary2 mb-6">
                Your order has been successfully placed. We&apos;ve sent a confirmation email to you with the details.
            </p>

            {/* Order Details Section */}
            <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 mt-6 mb-8 text-left">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Order Summary</h3>
                <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Order Number:</span>
                        <span className="font-mono bg-slate-200 text-slate-800 px-2 py-0.5 rounded">#{order?.id}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Order Date:</span>
                        <span>{format(new Date(order.date_created), 'MMMM d, yyyy')}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Order Status:</span>
                        <span className="capitalize font-semibold">{order.status}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-medium text-slate-500">Payment Status:</span>
                        {order.is_paid ? (
                            <span className="font-semibold text-green-800 flex items-center gap-1.5">
                                <Icon.ShieldCheck size={16} weight="fill" /> Paid
                            </span>
                        ) : (
                            <span className="font-semibold text-orange-500 flex items-center gap-1.5">
                                <Icon.Clock size={16} weight="fill" /> Pending Payment
                            </span>
                        )}
                    </div>
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