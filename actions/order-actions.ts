"use server"

import { OrderData, orderDataSchema } from "@/lib/validation";
import { Order } from "@/types/woocommerce";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

// Type for WooCommerce line items
export type LineItem = {
    product_id: number;
    quantity: number;
};

export async function createOrder({
    orderData,
    lineItems,
}: {
    orderData: OrderData;
    lineItems: LineItem[];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}) : Promise<{success: boolean, order?: Order, error?: any }> {
    const wooCommerce = new WooCommerceRestApi({
        url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL as string,
        consumerKey: process.env.WC_CONSUMER_KEY as string,
        consumerSecret: process.env.WC_CONSUMER_SECRET as string,
        version: "wc/v3",
        queryStringAuth: true,
    });

    const validatedData = orderDataSchema.parse(orderData)


    // Construct the order payload
    const payload = {
        ...validatedData,
        line_items: lineItems,
        set_paid: false, // COD orders are typically not paid upfront
        status: "processing", // Set initial status (adjust as needed)
    };

    try {
        const response = await wooCommerce.post("orders", payload);
        
        return { order: response.data, success: true };
    } catch (error) {
        const errorMessage = error || "Failed to create order";
        return { error: errorMessage, success: false };
    }
}


// Function to fetch order data
export async function getOrder(orderId: string): Promise<Order | null> {
    try {
        // Replace with your actual API endpoint
        const response = await fetch(`http://localhost:3000/api/woocommerce/orders/${orderId}`, {
            cache: "no-store",
        })

        // if (response.status !== 201) {
        //     return null
        // }

        const order = await response.json()
        return order
    } catch (error) {
        console.error("Error fetching order:", error)
        return null
    }
}