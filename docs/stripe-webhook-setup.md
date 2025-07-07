# WooCommerce Stripe Webhook Setup Guide

## Overview
This endpoint (`/api/stripe-web-hook`) handles incoming webhook events from Stripe to process WooCommerce payment-related events in real-time. It automatically updates order statuses, processes payments, and handles various e-commerce scenarios for your WooCommerce store.

## Setup Instructions

### 1. Environment Variables
Add these variables to your `.env.local` file:

```env
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# WooCommerce REST API Configuration (Optional - for direct order updates)
WOOCOMMERCE_URL=https://your-woocommerce-site.com
WOOCOMMERCE_KEY=ck_your_consumer_key_here
WOOCOMMERCE_SECRET=cs_your_consumer_secret_here
```

### 2. Stripe Dashboard Configuration

1. **Login to Stripe Dashboard**: Go to [https://dashboard.stripe.com](https://dashboard.stripe.com)

2. **Navigate to Webhooks**: 
   - Go to `Developers` > `Webhooks`
   - Click `Add endpoint`

3. **Configure Endpoint**:
   - **Endpoint URL**: `https://yourdomain.com/api/stripe-web-hook`
   - **Events to send**: Select these WooCommerce-relevant events:
     - `payment_intent.succeeded` - When a payment is successfully completed
     - `payment_intent.payment_failed` - When a payment fails
     - `checkout.session.completed` - When checkout is completed
     - `charge.succeeded` - When a charge is successful (for some payment flows)
     - `charge.failed` - When a charge fails
     - `charge.dispute.created` - When a chargeback/dispute is created
     - `invoice.payment_succeeded` - For subscription/recurring payments

4. **Get Webhook Secret**:
   - After creating the endpoint, click on it
   - Copy the `Signing secret` (starts with `whsec_`)
   - Add this to your `STRIPE_WEBHOOK_SECRET` environment variable

### 3. Local Development Testing

For local testing, use Stripe CLI:

1. **Install Stripe CLI**: [https://stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. **Login to Stripe**:
   ```bash
   stripe login
   ```

3. **Forward events to local endpoint**:
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe-web-hook
   ```

4. **Get webhook secret**:
   The CLI will output a webhook secret. Use this for your local `STRIPE_WEBHOOK_SECRET`.

5. **Trigger test events**:
   ```bash
   stripe trigger payment_intent.succeeded
   ```

## Supported WooCommerce Events

The webhook handler currently supports these Stripe events for WooCommerce:

- **`payment_intent.succeeded`**: WooCommerce order payment completed successfully
- **`payment_intent.payment_failed`**: WooCommerce order payment failed
- **`checkout.session.completed`**: WooCommerce checkout session completed
- **`charge.succeeded`**: Charge succeeded (for direct charge flows)
- **`charge.failed`**: Charge failed
- **`charge.dispute.created`**: Chargeback/dispute created for WooCommerce order
- **`invoice.payment_succeeded`**: Subscription/recurring payment for WooCommerce

## Implementation Notes

### Security
- The endpoint verifies webhook signatures using Stripe's webhook secret
- Only properly signed requests from Stripe are processed
- Failed signature verification returns a 400 error

### Error Handling
- Individual event handlers have try-catch blocks
- Errors are logged and don't crash the entire webhook processing
- Returns appropriate HTTP status codes

### Logging
- All events are logged to console with event type and ID
- Errors are logged with full details
- Use structured logging in production

## Customization

### Adding New Event Types
To handle additional Stripe events:

1. Add a new case to the switch statement in `route.ts`
2. Create a corresponding handler function
3. Update your Stripe webhook configuration to send the new event

### WooCommerce Integration
The current implementation includes TODO comments where you should integrate with WooCommerce:
- Update order status in WooCommerce via REST API
- Send order confirmation emails
- Process inventory updates
- Handle subscription renewals
- Manage customer records
- Process refunds and disputes

### Example WooCommerce Integration
```typescript
async function handleWooCommercePaymentSuccess(paymentIntent: Stripe.PaymentIntent) {
  const WooCommerceRestApi = require('@woocommerce/woocommerce-rest-api').default;
  
  const api = new WooCommerceRestApi({
    url: process.env.WOOCOMMERCE_URL!,
    consumerKey: process.env.WOOCOMMERCE_KEY!,
    consumerSecret: process.env.WOOCOMMERCE_SECRET!,
    version: 'wc/v3'
  });

  const orderId = paymentIntent.metadata?.order_id;
  
  // Update order status in WooCommerce
  await api.put(`orders/${orderId}`, {
    status: 'processing',
    transaction_id: paymentIntent.id,
    payment_method_title: 'Stripe',
    date_paid: new Date().toISOString()
  });
  
  // Send confirmation email (if not handled by WooCommerce)
  await sendOrderConfirmationEmail(orderId);
}
```

## Testing

### Manual Testing
1. Create a test order in your WooCommerce store
2. Process payment through Stripe
3. Check the webhook endpoint logs
4. Verify the order status was updated in WooCommerce

### Automated Testing
Consider adding tests for:
- Webhook signature verification
- WooCommerce order status updates
- Payment processing logic
- Error scenarios and rollbacks

## Troubleshooting

### Common Issues

1. **Signature Verification Failed**
   - Check webhook secret is correct
   - Ensure raw body is passed to verification
   - Check endpoint URL matches Stripe configuration

2. **Events Not Received**
   - Verify webhook endpoint is publicly accessible
   - Check Stripe dashboard for delivery attempts
   - Ensure endpoint returns 200 status

3. **WooCommerce Order Errors**
   - Check WooCommerce REST API credentials
   - Verify order IDs are passed in Stripe metadata
   - Ensure WooCommerce API endpoints are accessible
   - Handle cases where orders might not exist

### WooCommerce-Specific Debug Mode
Set environment variables for additional logging:
```env
STRIPE_WEBHOOK_DEBUG=true
WOOCOMMERCE_DEBUG=true
```

## WooCommerce Integration Requirements

### Required Metadata
When creating payments in Stripe, ensure you include these metadata fields:
- `order_id`: WooCommerce order ID
- `customer_id`: WooCommerce customer ID (optional)
- `order_key`: WooCommerce order key (optional)

### Example Payment Intent Creation
```typescript
const paymentIntent = await stripe.paymentIntents.create({
  amount: orderTotal,
  currency: 'usd',
  metadata: {
    order_id: wooCommerceOrderId,
    customer_id: wooCommerceCustomerId,
    order_key: wooCommerceOrderKey
  }
});
```

## WooCommerce Production Considerations

1. **Order Synchronization**: Ensure webhook processing doesn't conflict with WooCommerce's own order processing
2. **Idempotency**: Handle duplicate events gracefully to prevent double-processing orders
3. **WooCommerce API Rate Limits**: Implement rate limiting for WooCommerce REST API calls
4. **Order Status Mapping**: Map Stripe payment statuses to appropriate WooCommerce order statuses
5. **Inventory Management**: Coordinate inventory updates between Stripe webhooks and WooCommerce
6. **Customer Communication**: Avoid duplicate emails by coordinating with WooCommerce's email system
7. **Subscription Handling**: Properly handle recurring payments and subscription renewals
8. **Security**: Use HTTPS and validate all WooCommerce API calls
9. **Monitoring**: Set up monitoring for failed webhook processing and order sync issues
10. **Backup Processing**: Implement fallback mechanisms for failed webhook events
