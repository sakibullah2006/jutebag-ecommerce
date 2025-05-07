"use client"

import { useCart } from "@/hooks/use-cart"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const OrderSummary = () => {
    const { items, cartTotal } = useCart()
    const { shipping } = useCart()


    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between">
                                <div>
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                                </div>
                                <div>{item.price}</div>
                            </div>
                        ))}
                    </div>
                    <div className="border-t pt-4">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{cartTotal}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span>Shipping</span>
                            <span>{shipping ?? "select city to know"}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">shipping cost inside dhaka is $1.20</span>
                        <div className="flex justify-between mt-2 font-bold">
                            <span>Total</span>
                            <span>{cartTotal + shipping!}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary