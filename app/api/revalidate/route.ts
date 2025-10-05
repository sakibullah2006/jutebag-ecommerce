// app/api/revalidate/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import crypto from 'crypto';

// This function handles the incoming webhook from WooCommerce
export async function POST(request: NextRequest) {
    // 1. Verify the signature
    const signature = request.headers.get('x-wc-webhook-signature');
    const secret = process.env.WC_WEBHOOK_SECRET;

    if (!secret) {
        console.error('Webhook secret is not configured.');
        return new Response('Webhook secret is not configured.', { status: 500 });
    }

    // We need the raw body for the HMAC verification
    const requestBody = await request.text();

    if (!signature) {
        console.log("No signature found.")
        return new Response('No signature found.', { status: 401 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(requestBody, 'utf8');
    const calculatedSignature = hmac.digest('base64');

    if (calculatedSignature !== signature) {
        console.log("Invalid signature")
        return new Response('Invalid signature.', { status: 401 });
    }

    // 2. Signature is valid, now process the webhook
    try {
        const topic = request.headers.get('x-wc-webhook-topic');

        // A more robust approach is to parse the body and use the resource ID
        const payload = JSON.parse(requestBody);
        const resourceId = payload.id;

        console.log(`Webhook received for topic: ${topic} \nid: ${resourceId}`);
        // 3. Use a switch to handle different topics and revalidate the correct tags
        switch (topic) {
            case 'product.created':
            case 'product.updated':
            case 'product.deleted':
            case 'product.restored':
                revalidateTag('products');
                // You could also do fine-grained revalidation for a single product page
                if (resourceId) {
                    revalidateTag(`product:${resourceId}`);
                }
                break;

            case 'review.created':
                const productId = payload.product_id;
                if (productId) {
                    console.log(`Revalidating reviews for product: ${productId}`);
                    revalidateTag(`reviews:${productId}`); // Invalidates getProductReviews for that specific product
                }
                break;

            case 'coupon.created':
            case 'coupon.updated':
            case 'coupon.deleted':
            case 'coupon.restored':
                revalidateTag('coupons');
                if (resourceId) {
                    revalidateTag(`coupons:${resourceId}`);
                }
                break;

            // The "order" topics are tricky. You might not want to cache order data
            // in the same way, but if you do, here's how you'd handle it.
            // Typically, account and order pages are dynamically rendered.
            case 'order.created':
            case 'order.updated':
            case 'order.deleted':
                revalidateTag('orders');
                // Example for revalidating a specific user's orders
                if (resourceId) {
                    revalidateTag(`order:${resourceId}`);
                }
                if (payload.customer_id) {
                    revalidateTag(`orders:${payload.customer_id}`);
                }
                break;

            case 'customer.created':
            case 'customer.updated':
            case 'customer.deleted':
                revalidateTag(`customers`);
                // Example for revalidating a specific customer
                if (resourceId) {
                    revalidateTag(`customers:${resourceId}`);
                }
                break;

            // WooCommerce doesn't have default webhooks for tags/categories.
            // This would require a custom plugin in WordPress to fire webhooks
            // on `edited_term` or `created_term` actions.
            // If you implement that, you could handle it like this:
            case 'category.updated':
                revalidateTag('categories');
                break;

            case 'tag.updated':
                revalidateTag('tags');
                break

            default:
                break
        }

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (error) {
        console.error('Error processing webhook:', error);
        if (error instanceof Error) {
            return new Response(`Webhook error: ${error.message}`, { status: 400 });
        }
        return new Response(`Webhook error: An unknown error occurred`, { status: 500 });
    }
}