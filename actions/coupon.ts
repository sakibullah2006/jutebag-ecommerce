"use server"

import { CartItem } from "@/context/CartContext";
import { calculatePrice } from "@/lib/utils";
import { CouponDataType } from "@/types/data-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});




export async function validateCoupon(couponCode: string, cart: CartItem[]) {
  try {
    if (!couponCode) {
      return { isValid: false, error: 'Please enter a coupon code' };
    }

    const response = await WooCommerce.get(`coupons?code=${couponCode}`);
    const coupon: CouponDataType = response.data[0];

    if (!coupon) {
      return { isValid: false, error: 'Invalid coupon code' };
    }

    const currentDate = new Date();
    const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
    if (expiryDate && currentDate > expiryDate) {
      return { isValid: false, error: 'Coupon has expired' };
    }

    const cartTotal = cart.reduce((sum, item) => sum + Number(calculatePrice(item)) * item.quantity, 0);
    if (coupon.minimum_amount && cartTotal < parseFloat(coupon.minimum_amount)) {
      return { isValid: false, error: `Minimum spend of ৳${coupon.minimum_amount} required` };
    }

    const applicableProductIds = coupon.product_ids;
    const cartProductIds = cart.map((item) => item.id);
    if (applicableProductIds.length > 0 && !cartProductIds.some((id) => applicableProductIds.includes(id))) {
      return { isValid: false, error: 'Coupon not applicable to items in cart' };
    }

    return {
      isValid: true,
      coupon: {
        code: coupon.code,
        discount_type: coupon.discount_type,
        amount: parseFloat(coupon.amount),
        product_ids: coupon.product_ids
      },
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { isValid: false, error: 'Error validating coupon' };
  }
}