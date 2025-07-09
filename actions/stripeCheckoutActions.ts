'use server';

import { headers } from 'next/headers';
import Stripe from 'stripe';
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { OrderType } from '@/types/order-type';

// Initialize clients outside the function so they're reused
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const wooCommerceApi = new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_URL as string,
    consumerKey: process.env.WOOCOMMERCE_KEY as string,
    consumerSecret: process.env.WOOCOMMERCE_SECRET as string,
    version: "wc/v3"
});

export async function createCheckoutSession(orderId: number) {
    if (!orderId) {
        return { error: 'Order ID is required.' };
    }

    try {
        // 1. Retrieve the full order data from WooCommerce
        const response = await wooCommerceApi.get(`orders/${orderId}`);
        const order: OrderType = response.data;

        // 2. Map WooCommerce order items to Stripe line items
        const productLineItems = order.line_items.map(item => ({
            price_data: {
                currency: order.currency.toLowerCase(),
                product_data: {
                    name: item.name,
                },
                unit_amount: parseFloat(item.price) * 100, // Price in cents
            },
            quantity: item.quantity,
        }));

        const finalLineItems = [...productLineItems];

        // 3. Add total tax as a separate line item
        const totalTax = parseFloat(order.total_tax);
        if (totalTax > 0) {
            finalLineItems.push({
                price_data: {
                    currency: order.currency.toLowerCase(),
                    product_data: { name: 'Taxes' },
                    unit_amount: totalTax * 100,
                },
                quantity: 1,
            });
        }

        // 4. Add total discount as a negative line item
        const totalDiscount = parseFloat(order.discount_total);
        if (totalDiscount > 0) {
            finalLineItems.push({
                price_data: {
                    currency: order.currency.toLowerCase(),
                    product_data: { name: 'Discount' },
                    unit_amount: -Math.abs(totalDiscount * 100),
                },
                quantity: 1,
            });
        }

        // Get the base URL for the success/cancel URLs
        const origin = (await headers()).get('origin');

        // 5. Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: finalLineItems,
            customer_email: order.billing.email,
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: parseFloat(order.shipping_total) * 100,
                            currency: order.currency.toLowerCase(),
                        },
                        display_name: order.shipping_lines[0]?.method_title || 'Shipping',
                    },
                },
            ],
            metadata: {
                woocommerce_order_id: order.id,
            },
            success_url: `${origin}/payment/success?order_key=${order.order_key}`,
            cancel_url: `${origin}/checkout/order?id=${order.id}`,
        });

        // 6. Return the session ID
        return { sessionId: session.id };

    } catch (err) {
        console.error("Stripe Session Error:", err);
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return { error: `Error creating checkout session: ${errorMessage}` };
    }
}