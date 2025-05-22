// app/checkout/page.tsx
import { getCountries, getShippingZones, getTaxes } from "@/actions/data-actions";
import { CheckoutForm } from "@/components/store/checkout-form";
import OrderSummary from "@/components/store/order-summary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Checkout - Store with WP",
    description: "Complete your order with our secure checkout process. Pay with Cash on Delivery and review your order summary.",
};

export default async function CheckoutPage() {
    // Get cart items from cookies
    const cartItems = (await cookies()).get("cartItems")?.value;
    const items = cartItems ? JSON.parse(cartItems) : [];

    // Redirect if cart is empty
    if (!items.length) {
        redirect("/cart?message=Your cart is empty");
    }

    const [countries, taxes, shippingZones] = await Promise.all([
        getCountries(),
        getTaxes(),
        getShippingZones(), // New: Fetch shipping zones
    ]);



    return (
        <div className="container mx-auto py-10">
            <div className="grid gap-8 md:grid-cols-2">
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Checkout</CardTitle>
                            <CardDescription>Complete your order with Cash on Delivery</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Suspense fallback={<div>Loading checkout form...</div>}>
                                <CheckoutForm countries={countries} taxes={taxes} shippingZones={shippingZones} />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <OrderSummary />
                </div>
            </div>
        </div>
    );
}