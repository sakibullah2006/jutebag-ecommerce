import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-05-28.basil"
})

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
    const body = await req.text()
    const sig = req.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error'
        console.error('⚠️  Webhook signature verification failed.', errorMessage)
        return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 })
    }

    // Handle the event
    console.log(`🔔 WooCommerce Stripe Event received: ${event.type}`)

    try {
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntentSucceeded = event.data.object as Stripe.PaymentIntent
                console.log('💰 WooCommerce Payment succeeded:', paymentIntentSucceeded.id)

                // Handle successful WooCommerce order payment
                await handleWooCommercePaymentSuccess(paymentIntentSucceeded)
                break

            case 'payment_intent.payment_failed':
                const paymentIntentFailed = event.data.object as Stripe.PaymentIntent
                console.log('❌ WooCommerce Payment failed:', paymentIntentFailed.id)

                // Handle failed WooCommerce order payment
                await handleWooCommercePaymentFailure(paymentIntentFailed)
                break

            case 'checkout.session.completed':
                const checkoutSession = event.data.object as Stripe.Checkout.Session
                console.log('✅ WooCommerce Checkout session completed:', checkoutSession.id)

                // Handle successful WooCommerce checkout
                await handleWooCommerceCheckoutComplete(checkoutSession)
                break

            case 'charge.succeeded':
                const chargeSucceeded = event.data.object as Stripe.Charge
                console.log('💳 WooCommerce Charge succeeded:', chargeSucceeded.id)

                // Handle successful charge (alternative to payment_intent for some flows)
                await handleWooCommerceChargeSuccess(chargeSucceeded)
                break

            case 'charge.failed':
                const chargeFailed = event.data.object as Stripe.Charge
                console.log('💳 WooCommerce Charge failed:', chargeFailed.id)

                // Handle failed charge
                await handleWooCommerceChargeFailure(chargeFailed)
                break

            case 'charge.dispute.created':
                const dispute = event.data.object as Stripe.Dispute
                console.log('⚠️ WooCommerce Charge dispute created:', dispute.id)

                // Handle chargeback/dispute for WooCommerce order
                await handleWooCommerceDispute(dispute)
                break

            case 'invoice.payment_succeeded':
                const invoice = event.data.object as Stripe.Invoice
                console.log('📄 WooCommerce Invoice payment succeeded:', invoice.id)

                // Handle subscription or recurring payment for WooCommerce
                await handleWooCommerceInvoiceSuccess(invoice)
                break

            default:
                console.log(`Unhandled WooCommerce Stripe event type: ${event.type}`)
        }
    } catch (error) {
        console.error('Error processing WooCommerce webhook:', error)
        return NextResponse.json(
            { error: 'Error processing WooCommerce webhook event' },
            { status: 500 }
        )
    }

    return NextResponse.json({ received: true }, { status: 200 })
}// Handler functions for WooCommerce-specific events
async function handleWooCommercePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
    try {
        console.log('Processing WooCommerce payment success...')

        // Extract order information from metadata
        const orderId = paymentIntent.metadata?.order_id
        const customerId = paymentIntent.metadata?.customer_id
        const orderKey = paymentIntent.metadata?.order_key

        if (!orderId) {
            console.error('No order_id found in payment intent metadata')
            return
        }

        // TODO: Update WooCommerce order status via API
        // Example using WooCommerce REST API:
        /*
        const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
        
        const api = new WooCommerceRestApi({
            url: process.env.WOOCOMMERCE_URL!,
            consumerKey: process.env.WOOCOMMERCE_KEY!,
            consumerSecret: process.env.WOOCOMMERCE_SECRET!,
            version: 'wc/v3'
        });

        await api.put(`orders/${orderId}`, {
            status: 'processing',
            transaction_id: paymentIntent.id,
            payment_method_title: 'Stripe',
            date_paid: new Date().toISOString()
        });
        */

        // TODO: Send order confirmation email
        // TODO: Update inventory
        // TODO: Trigger fulfillment process

        console.log(`✅ WooCommerce order ${orderId} payment processed successfully`)

    } catch (error) {
        console.error('Error handling WooCommerce payment success:', error)
        throw error
    }
}

async function handleWooCommercePaymentFailure(paymentIntent: Stripe.PaymentIntent) {
    try {
        console.log('Processing WooCommerce payment failure...')

        const orderId = paymentIntent.metadata?.order_id
        const failureReason = paymentIntent.last_payment_error?.message

        if (!orderId) {
            console.error('No order_id found in payment intent metadata')
            return
        }

        // TODO: Update WooCommerce order status to 'failed'
        /*
        await api.put(`orders/${orderId}`, {
            status: 'failed',
            customer_note: `Payment failed: ${failureReason}`
        });
        */

        // TODO: Send payment failure notification to customer
        // TODO: Log failed payment for retry/manual processing

        console.log(`❌ WooCommerce order ${orderId} payment failed: ${failureReason}`)

    } catch (error) {
        console.error('Error handling WooCommerce payment failure:', error)
        throw error
    }
}

async function handleWooCommerceCheckoutComplete(session: Stripe.Checkout.Session) {
    try {
        console.log('Processing WooCommerce checkout completion...')

        const orderId = session.metadata?.order_id
        const customerId = session.customer

        if (!orderId) {
            console.error('No order_id found in checkout session metadata')
            return
        }

        // TODO: Update WooCommerce order with checkout session details
        /*
        await api.put(`orders/${orderId}`, {
            status: 'processing',
            transaction_id: session.payment_intent,
            billing: {
                email: session.customer_details?.email
            }
        });
        */

        // TODO: Create/update customer in WooCommerce if needed
        // TODO: Send order confirmation
        // TODO: Process digital downloads if applicable

        console.log(`✅ WooCommerce checkout completed for order ${orderId}`)

    } catch (error) {
        console.error('Error handling WooCommerce checkout completion:', error)
        throw error
    }
}

async function handleWooCommerceChargeSuccess(charge: Stripe.Charge) {
    try {
        console.log('Processing WooCommerce charge success...')

        const orderId = charge.metadata?.order_id

        if (!orderId) {
            console.error('No order_id found in charge metadata')
            return
        }

        // TODO: Update WooCommerce order with charge details
        // This is useful for payment methods that use charges directly

        console.log(`💳 WooCommerce charge processed for order ${orderId}`)

    } catch (error) {
        console.error('Error handling WooCommerce charge success:', error)
        throw error
    }
}

async function handleWooCommerceChargeFailure(charge: Stripe.Charge) {
    try {
        console.log('Processing WooCommerce charge failure...')

        const orderId = charge.metadata?.order_id
        const failureReason = charge.failure_message

        if (!orderId) {
            console.error('No order_id found in charge metadata')
            return
        }

        // TODO: Update WooCommerce order status and add failure note

        console.log(`💳 WooCommerce charge failed for order ${orderId}: ${failureReason}`)

    } catch (error) {
        console.error('Error handling WooCommerce charge failure:', error)
        throw error
    }
}

async function handleWooCommerceDispute(dispute: Stripe.Dispute) {
    try {
        console.log('Processing WooCommerce dispute/chargeback...')

        const chargeId = dispute.charge

        // TODO: Find related WooCommerce order by charge ID
        // TODO: Update order status to indicate dispute
        // TODO: Notify store admin about dispute
        // TODO: Gather evidence for dispute response

        console.log(`⚠️ Dispute created for charge ${chargeId}`)

    } catch (error) {
        console.error('Error handling WooCommerce dispute:', error)
        throw error
    }
}

async function handleWooCommerceInvoiceSuccess(invoice: Stripe.Invoice) {
    try {
        console.log('Processing WooCommerce subscription/recurring payment...')

        const subscriptionId = invoice.application
        const customerId = invoice.customer

        // TODO: Handle subscription renewals for WooCommerce
        // TODO: Update subscription status in WooCommerce
        // TODO: Send renewal confirmation

        console.log(`📄 WooCommerce subscription payment processed: ${subscriptionId}`)

    } catch (error) {
        console.error('Error handling WooCommerce invoice success:', error)
        throw error
    }
}
