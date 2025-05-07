import { CheckoutForm } from "@/components/store/checkout-form"
import OrderSummary from "@/components/store/order-summary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Suspense } from "react"

export default function CheckoutPage() {

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
                                <CheckoutForm />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
                <div>
                    <OrderSummary />
                </div>
            </div>
        </div>
    )
}


