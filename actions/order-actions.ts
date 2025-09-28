"use server"

import { OrderData, orderDataSchema } from "@/lib/validations/validation";
import { LineItem, OrderType } from "@/types/order-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import Cookies from "js-cookie";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { wooCommerceFetch } from "./wooCommerceFetch";

// Valid WooCommerce order statuses
const VALID_ORDER_STATUSES = [
    'pending',
    'processing',
    'on-hold',
    'completed',
    'cancelled',
    'refunded',
    'failed',
    'trash'
];

// Validate order status
function isValidOrderStatus(status: string): boolean {
    return VALID_ORDER_STATUSES.includes(status);
}


const WooCommerce = new WooCommerceRestApi({
    url: process.env.WORDPRESS_SITE_URL as string,
    consumerKey: process.env.WC_CONSUMER_KEY as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET as string,
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
}) {

    const validatedData = orderDataSchema.parse(orderData)

    const storedUser = (await cookies()).get("user")?.value
    const userId = storedUser ? (JSON.parse(storedUser).user_id || 0) : 0;
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for')



    const payload = {
        ...validatedData,
        customer_id: userId || 0,
        cart_tax,
        line_items: lineItems,
        customer_ip_address: ip as string,
        set_paid: false, // COD orders are typically not paid upfront
        needs_payment: true,
        status: validatedData.payment_method === "cod" ? "processing" : "pending", // Set initial status (adjust as needed)
        shipping_lines: shipping_lines || [],
        coupon_lines: coupon_lines || [],
    };

    try {
        const response = await WooCommerce.post("orders", payload);

        // ACTION: Revalidate the order list for this specific user.
        // This is much more efficient than revalidating the whole home page.
        if (userId) {
            revalidateTag(`orders:${userId}`);
        }

        return { order: response.data, success: true };
    } catch (error) {
        console.error("Failed to create order:", error);
        return { error: "Failed to create order", success: false };
    }
}

// Function to fetch a single order using tag-based caching
export async function getOrder(orderId: string): Promise<OrderType | null> {
    try {
        // Use the fetch wrapper and tag the request specifically to this order
        const { data } = await wooCommerceFetch(`orders/${orderId}`, {
            tags: [`order:${orderId}`]
        });
        return data as OrderType;
    } catch (error) {
        return null;
    }
}

// Fetch a user's orders using tag-based caching
export const fetchOrdersByUserId = async ({
    params,
}: {
    params: { userId: number };
}): Promise<{
    orders: OrderType[];
    totalItems: number;
    status: 'OK' | 'ERROR';
}> => {
    // This function can now be simplified as we don't need the manual pagination loop
    // if we trust the `x-wp-total` header or get a reasonable number of orders per page.
    // For simplicity, let's fetch up to 100 recent orders.
    const perPage = 100;

    try {
        const endpoint = `orders?customer=${params.userId}&per_page=${perPage}`;
        // Tag this request to the specific user's orders
        const { data, headers } = await wooCommerceFetch(endpoint, {
            tags: [`orders:${params.userId}`]
        });

        const totalItems = parseInt(headers.get('x-wp-total') || '0', 10);

        return {
            orders: data,
            totalItems: totalItems,
            status: 'OK',
        };
    } catch (error) {
        return {
            orders: [],
            totalItems: 0,
            status: 'ERROR',
        };
    }
};

// Update an order and revalidate the relevant caches
export async function updateOrderStatus(orderId: number, status: string, transactionId: string, paid: boolean, date: string) {
    try {
        // Validate inputs
        if (!orderId || orderId <= 0) {
            throw new Error('Invalid order ID');
        }

        if (!isValidOrderStatus(status)) {
            throw new Error(`Invalid order status: ${status}. Valid statuses are: ${VALID_ORDER_STATUSES.join(', ')}`);
        }

        const storedUser = (await cookies()).get("user")?.value
        const userId = storedUser ? (JSON.parse(storedUser).user_id || 0) : 0;

        // Build the payload with WooCommerce API fields
        const payload: any = {
            status: status,
        };

        // Add transaction_id directly as a field (not meta_data)
        if (transactionId && transactionId.trim()) {
            payload.transaction_id = transactionId.trim();
        }

        // Only add set_paid if explicitly marking as paid
        if (paid === true) {
            payload.set_paid = true;
        }

        // Add date_paid only if we have a valid date and marking as paid
        if (paid && date && date.trim()) {
            try {
                const dateObj = new Date(date);
                if (!isNaN(dateObj.getTime())) {
                    payload.date_paid = dateObj.toISOString();
                }
            } catch (dateError) {
                console.warn('Invalid date format, skipping date_paid:', date);
            }
        }



        console.log(`Updating order ${orderId} with payload:`, payload);

        const response = await WooCommerce.put(`orders/${orderId}`, payload);

        console.log(`Order ${orderId} updated successfully:`, response.data.status);

        // ACTION: Revalidate the specific order and the user's order list
        revalidateTag(`order:${orderId}`);
        if (userId) {
            revalidateTag(`orders:${userId}`);
        }

        return { success: true, data: response.data };
    } catch (err: any) {
        console.error(`Failed to update order ${orderId}:`, err);

        // Log detailed error information
        if (err.response) {
            console.error('Error response status:', err.response.status);
            console.error('Error response data:', JSON.stringify(err.response.data, null, 2));
        }

        const errorMessage = err.response?.data?.message || err.message || "Failed to update order status.";

        return {
            success: false,
            error: errorMessage,
            details: err.response?.data || null
        };
    }
}

export interface CheckedOrder {
    id: number;
    status: string;
    date_created: string;
    is_paid: boolean;
}

export async function checkOrderExists(orderId: number): Promise<CheckedOrder | null> {
    try {
        const { data: order } = await wooCommerceFetch(`orders/${orderId}`, {
            tags: [`order:${orderId}`]
        });

        const checkedOrder: CheckedOrder = {
            id: order.id,
            status: order.status,
            date_created: order.date_created,
            is_paid: !!order.date_paid,
        };

        return checkedOrder;
    } catch (error) {
        return null;
    }
}
