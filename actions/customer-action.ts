"use server"

import { AddressFormValues, PersonalInfoFormValues, personalInfoSchema } from "@/lib/validations/validation";
import { OrderType } from "@/types/order-type";
import { Customer, DownloadData } from "@/types/customer-type";

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import next from "next";
import { revalidatePath, revalidateTag } from "next/cache";
import { wooCommerceFetch } from "./wooCommerceFetch";
import { PATH } from "../constant/pathConstants";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL! as string,
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});


export async function fetchProfileData(userId: number) {
  if (!userId) {
    throw new Error("User ID is required to fetch profile data");
  }

  try {
    // Fetch customer, orders, and downloads in parallel with specific cache tags
    const [customerResult, ordersResult, downloadsResult] = await Promise.all([
      wooCommerceFetch(`customers/${userId}`, { tags: [`customers:${userId}`, 'customers'], revalidate: 1 },),
      wooCommerceFetch(`orders?customer=${userId}`, { tags: [`orders:${userId}`] },),
      wooCommerceFetch(`customers/${userId}/downloads`, { tags: [`customers:${userId}`, 'customers'], revalidate: 1 },)
    ]);

    const customer = customerResult.data as Customer;
    const orders = ordersResult.data as OrderType[];
    const downloads = downloadsResult.data as DownloadData[];

    // Your existing validation logic is good
    const filteredOrders = orders.filter((order) => order.customer_id === userId || order.billing?.email === customer.email);

    return { customer, orders: filteredOrders, downloads };
  } catch (error) {
    console.error("Error fetching profile data:", error);
    throw new Error("Failed to fetch profile data");
  }
}



export async function getCustomerInfo(userId: number) {
  try {
    // Use the fetch wrapper and tag the request
    const { data: customer } = await wooCommerceFetch(`customers/${userId}`, {
      tags: [`customers:${userId}`, 'customers']
    });
    return { success: true, data: customer as Customer };
  } catch (error) {
    return { success: false, message: "Failed to retrieve customer information" };
  }
}




export async function updateCustomerPersonalInfo(userId: number, data: PersonalInfoFormValues) {
  try {
    const customersResponse = await wooCommerceFetch(`customers?email=${encodeURIComponent(data.email)}`, {
      tags: [`customers:` + userId, 'customers']
    });
    const existingCustomer = customersResponse.data.find((c: Customer) => c.id !== userId);
    if (existingCustomer) {
      return { success: false, message: 'Email is already in use by another account' };
    }

    const validatedData = personalInfoSchema.parse(data)

    const response = await WooCommerce.put(`customers/${userId}`, {
      ...validatedData,
    });

    revalidateTag(`customers:` + userId)
    revalidatePath(PATH.DASHBOARD)

    console.log('Personal info updated successfully:', response.data);
    return { success: true, message: 'Personal information updated successfully', data: response.data };
  } catch (error) {
    console.error('Error updating personal info:', error);
    return { success: false, message: 'Failed to update personal information' };
  }
}


export async function updateCustomerAddress(id: number, type: 'billing' | 'shipping', data: AddressFormValues) {
  try {
    // const updateData = { [type]: data };

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

    // NOTE: Removed `next` object from the PUT request body.
    const response = await WooCommerce.put(`customers/${id}`, updateData);

    // ACTION: Revalidate the specific customer's data.
    // This is more precise than revalidating a generic path.
    revalidateTag(`customers:${id}`);

    return { success: true, message: `${type.charAt(0).toUpperCase() + type.slice(1)} address updated successfully`, data: response.data };
  } catch (error) {
    console.error(`Error updating ${type} address:`, error);
    return { success: false, message: `Failed to update ${type} address` };
  }
}


