"use server"

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || "https://axessories.store/headless",
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});


export async function validateCoupon(couponCode: string) {
  try {
    const response = await WooCommerce.get(`coupons?code=${couponCode}`);
    const coupon = response.data[0];

    if (!coupon) {
      return { isValid: false, error: 'Invalid coupon code' };
    }

    // Check if coupon is active and not expired
    const currentDate = new Date();
    const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
    if (expiryDate && currentDate > expiryDate) {
      return { isValid: false, error: 'Coupon has expired' };
    }

    return {
      isValid: true,
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type, // e.g., 'percent', 'fixed_cart'
        amount: parseFloat(coupon.amount), // Discount value
      },
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { isValid: false, error: 'Error validating coupon' };
  }
}