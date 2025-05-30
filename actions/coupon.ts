"use server"

import { CartItem } from "@/providers/cart-context";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL || "https://axessories.store/headless",
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});


// export async function validateCoupon(couponCode: string) {
//   try {
//     const response = await WooCommerce.get(`coupons?code=${couponCode}`);
//     const coupon = response.data[0];

//     if (!coupon) {
//       return { isValid: false, error: 'Invalid coupon code' };
//     }

//     // Check if coupon is active and not expired
//     const currentDate = new Date();
//     const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
//     if (expiryDate && currentDate > expiryDate) {
//       return { isValid: false, error: 'Coupon has expired' };
//     }

//     return {
//       isValid: true,
//       coupon: {
//         code: coupon.code,
//         discount_type: coupon.discount_type, // e.g., 'percent', 'fixed_cart'
//         amount: parseFloat(coupon.amount), // Discount value
//       },
//     };
//   } catch (error) {
//     console.error('Error validating coupon:', error);
//     return { isValid: false, error: 'Error validating coupon' };
//   }
// }


export async function validateCoupon(couponCode: string, cart: CartItem[]) {
  try {
    if (!couponCode) {
      return { isValid: false, error: 'Please enter a coupon code' };
    }

    const response = await WooCommerce.get(`coupons?code=${couponCode}`);
    const coupon = response.data[0];

    if (!coupon) {
      return { isValid: false, error: 'Invalid coupon code' };
    }

    const currentDate = new Date();
    const expiryDate = coupon.date_expires ? new Date(coupon.date_expires) : null;
    if (expiryDate && currentDate > expiryDate) {
      return { isValid: false, error: 'Coupon has expired' };
    }

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
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
      },
    };
  } catch (error) {
    console.error('Error validating coupon:', error);
    return { isValid: false, error: 'Error validating coupon' };
  }
}