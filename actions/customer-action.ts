"use server"

import { Customer, Order } from "@/types/woocommerce";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
    url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || "https://axessories.store/headless",
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
});


export async function fetchProfileData(userId: number) {
    if (!process.env.WC_CONSUMER_KEY || !process.env.WC_CONSUMER_SECRET) {
        throw new Error("WooCommerce API credentials are missing");
    }

    //   const token = cookies().get("jwt_token")?.value;
    // const token = (await cookies()).get("jwt_token")?.value


    try {
        const [customerResponse, ordersResponse] = await Promise.all([
            WooCommerce.get(`customers/${userId}`),
            WooCommerce.get("orders", {
                params: { customer_id: userId },
            }),
        ]);

        const customer = customerResponse.data as Customer;
        const orders = ordersResponse.data as Order[];

        // Additional validation to ensure orders belong to the userId
        const filteredOrders = orders.filter((order) => order.customer_id === userId);

        if (filteredOrders.length !== orders.length) {
            console.warn(`Filtered out ${orders.length - filteredOrders.length} orders not belonging to userId ${userId}`);
        }

        return { customer, orders: filteredOrders };
    } catch (error) {
        console.error("Error fetching profile data:", error);
        throw error instanceof Error ? error : new Error("Failed to fetch profile data");
    }
}