"use server"

import { OrderData, orderDataSchema } from "@/lib/validation";
import { LineItem, OrderType } from "@/types/order-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Cookies from "js-cookie";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";


const WooCommerce = new WooCommerceRestApi({
    url: process.env.WORDPRESS_SITE_URL as string,
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
});


export async function createOrder({
    orderData,
    lineItems,
    coupon_lines,
    cart_tax,
    shipping_lines,
}: {
    orderData: OrderData;
    lineItems: LineItem[];
    cart_tax: number;
    shipping_lines?: { total: string, method_id: string, method_title: string }[];
    coupon_lines?: { code: string }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ success: boolean, order?: OrderType, error?: any }> {


    const validatedData = orderDataSchema.parse(orderData)

    const storedUser = (await cookies()).get("user")?.value
    // const email = JSON.parse(storedUser!).user_email
    const userId = storedUser ? (JSON.parse(storedUser).user_id || 0) : 0;


    // Construct the order payload
    const payload = {
        ...validatedData,
        customer_id: userId || 0,
        cart_tax,
        line_items: lineItems,
        set_paid: false, // COD orders are typically not paid upfront
        needs_payment: true,
        status: validatedData.payment_method === "cod" ? "processing" : "pending", // Set initial status (adjust as needed)
        shipping_lines: shipping_lines || [],
        coupon_lines: coupon_lines || [],
    };

    try {
        const response = await WooCommerce.post("orders", payload);

        revalidatePath('/')
        return { order: response.data, success: true };
    } catch {
        // const errorMessage = error || "Failed to create order";
        const res = { error: "failed", success: false }
        return res;
    }
}


// Function to fetch order data
export async function getOrder(orderId: string): Promise<OrderType | null> {
    try {
        const response = await WooCommerce.get(`orders/${orderId}`)
        return response.data as OrderType
    } catch (error) {
        console.error("Error fetching order:", error)
        return null
    }
}

export async function fetchOrdersByUserId(userId: number): Promise<OrderType[]> {
    let allOrders: OrderType[] = [];
    let page = 1;
    const perPage = 50;

    try {
        while (true) {
            const response = await WooCommerce.get("orders", {
                customer: userId,
                per_page: perPage,
                page: page,
            });

            const orders: OrderType[] = response.data;
            allOrders = [...allOrders, ...orders];

            if (orders.length < perPage) {
                break; // Exit loop if fewer orders are fetched than perPage
            }

            page++; // Increment page for the next fetch
        }

        return allOrders;
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}
