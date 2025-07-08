"use server"

import { AddressFormValues, PersonalInfoFormValues, personalInfoSchema } from "@/lib/validation";
import { OrderType } from "@/types/order-type";
import { Customer, DownloadData } from "@/types/customer-type";

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import next from "next";
import { revalidatePath } from "next/cache";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL! as string,
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
    const [customerResponse, ordersResponse, customerDownloads] = await Promise.all([
      WooCommerce.get(`customers/${encodeURIComponent(userId)}`, { next: { revalidate: 2 } }),
      WooCommerce.get("orders", { params: { customer: userId } }),
      WooCommerce.get(`customers/${userId}/downloads`, { next: { revalidate: 0 } })
    ]);

    const customer = customerResponse.data as Customer;
    const orders = ordersResponse.data as OrderType[];
    const downloads = customerDownloads.data as DownloadData[];

    // Additional validation to ensure orders belong to the userId
    const filteredOrders = orders.filter((order) => order.customer_id === userId || order.billing?.email === customer.email);

    if (filteredOrders.length !== orders.length) {
      console.warn(`Filtered out ${orders.length - filteredOrders.length} orders not belonging to userId ${userId}`);
    }

    return { customer, orders: filteredOrders, downloads };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch profile data");
  }
}

export async function getCustomerInfo(userId: number) {
  try {
    const response = await WooCommerce.get(`customers/${encodeURIComponent(userId)}`);
    const customer = response.data as Customer;
    return { success: true, data: customer };
  } catch (error) {
    console.error("Error retrieving customer info:", error);
    return { success: false, message: "Failed to retrieve customer information" };
  }
}


export async function updateCustomerPersonalInfo(userId: number, data: PersonalInfoFormValues) {
  try {
    const customersResponse = await WooCommerce.get(`customers?email=${encodeURIComponent(data.email)}`);
    const existingCustomer = customersResponse.data.find((c: Customer) => c.id !== userId);
    if (existingCustomer) {
      return { success: false, message: 'Email is already in use by another account' };
    }

    const validatedData = personalInfoSchema.parse(data)

    const response = await WooCommerce.put(`customers/${userId}`, {
      ...validatedData,
      next: { revalidatePath: `/profile/${userId}` },
    });

    console.log('Personal info updated successfully:', response.data);
    return { success: true, message: 'Personal information updated successfully', data: response.data };
  } catch (error) {
    console.error('Error updating personal info:', error);
    return { success: false, message: 'Failed to update personal information' };
  }
}

export async function updateCustomerAddress(id: number, type: 'billing' | 'shipping', data: AddressFormValues) {
  try {
    const updateData = {
      [type]: {
        first_name: data.first_name,
        last_name: data.last_name || '',
        address_1: data.address_1,
        address_2: data.address_2 || '',
        city: data.city,
        state: data.state || '',
        postcode: data.postcode,
        country: data.country,
        email: data.email || '',
        phone: data.phone || '',
      },
    };

    const response = await WooCommerce.put(`customers/${encodeURIComponent(id)}`, {
      ...updateData,
      next: { revalidatePath: `/profile/${id}` },
    });
    return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} address updated successfully`, data: response.data };
  } catch (error) {
    console.error(`Error updating ${type} address:`, error);
    return { success: false, message: `Failed to update ${type} address` };
  }
}