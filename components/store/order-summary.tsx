"use client"

import { validateCoupon } from "@/actions/coupon"
import { useCart } from "@/hooks/use-cart"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"


const OrderSummary = () => {
    const { items, cartTotal, shipping, totalItems, setAppliedCoupon, appliedCoupon, selectedTaxes } = useCart()
    const [couponStatus, setCouponStatus] = useState<{ isValid: boolean; error?: string, coupon?: { amount: number, discount_type: "fixed_cart" | "percent", code: string } } | null>(null);
    const [couponCode, setCouponCode] = useState<string>('')
    const [calculatedPrice, setCalculatedPrice] = useState<string | null>(null)

    // Handle coupon validation
    const handleApplyCoupon = async () => {
        if (!couponCode) {
            setCouponStatus({ isValid: false, error: 'Please enter a coupon code' });
            return;
        }

        const result = await validateCoupon(couponCode);
        setCouponStatus(result);
        if (result.isValid) {
            setAppliedCoupon(couponCode);
            toast.success('Coupon applied successfully!');
        } else {
            setAppliedCoupon(null);
            toast.error(result.error);
        }
        setCouponCode(''); // Clear the input field after applying
    };

    useEffect(() => {
        setCalculatedPrice(calculateTotalPrice())
    }, [appliedCoupon, selectedTaxes, shipping])

    const calculateTotalPrice = useCallback(() => {
        let total = cartTotal;
        const cart_tax = selectedTaxes.reduce((total, tax) => total + (parseFloat(tax.rate) * cartTotal / 100), 0) || 0;
        total += cart_tax;

        if (couponStatus?.isValid && couponStatus.coupon) {
            if (couponStatus.coupon.discount_type === "fixed_cart") {
                total -= couponStatus.coupon.amount;
            } else if (couponStatus.coupon.discount_type === "percent") {
                total -= (total * couponStatus.coupon.amount) / 100;
            }
        }

        if (shipping) {
            total += shipping;
        }

        return total > 0 ? total.toFixed(2) : "0.00";
    }, [cartTotal, shipping, couponStatus, selectedTaxes])

    return (
        <Card className="sticky top-20">
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
                    <div className="border-t pt-4 text-sm text-gray-900 dark:text-gray-100">
                        <div className="flex justify-between">
                            <span>Subtotal - {totalItems} {totalItems > 1 ? "items" : "item"}</span>
                            <span>{cartTotal.toFixed(2)}</span>
                        </div>
                        {(couponStatus?.isValid === true && appliedCoupon) && (
                            <div className="flex justify-between">
                                <span>Discount</span>
                                <Badge variant="secondary" className="text-sm">
                                    <span className="text-green-600"> - {couponStatus?.coupon?.amount.toFixed(2)} {couponStatus.coupon?.discount_type === "fixed_cart" ? "$" : "%"}</span>
                                </Badge>
                            </div>
                        )}
                        {selectedTaxes && selectedTaxes.map((tax) => (
                            <div key={tax.id} className="flex justify-between">
                                <span>{tax.name}</span>
                                <span>{(parseFloat(tax.rate) * cartTotal / 100).toFixed(2)}</span>
                            </div>
                        ))}

                        <div className="flex justify-between mt-2">
                            <span>Shipping</span>
                            <span>{shipping !== 0 ? shipping : "select city to know"}</span>
                        </div>

                        {/* Coupon Input */}
                        <div className="flex flex-col gap-3">

                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleApplyCoupon();
                                }}
                                className="space-y-2"
                            >
                                {/* <Label htmlFor="couponCode">Coupon Code</Label> */}
                                <div className="flex gap-2 my-2">
                                    <Input
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        name="couponCode"
                                        id="couponCode"
                                        onChange={(e) => setCouponCode(e.target.value)}
                                    />
                                    <Button type="submit" disabled={!couponCode}>
                                        Apply
                                    </Button>
                                </div>

                                {couponStatus?.error && (
                                    <p className="text-destructive text-sm mt-1">{couponStatus.error}</p>
                                )}
                                {couponStatus?.isValid && (
                                    <p className="text-green-600 text-sm mt-1">Coupon applied successfully!</p>
                                )}
                            </form>
                        </div>

                        <span className="text-sm text-muted-foreground">shipping cost inside dhaka is $1.20</span>
                        <div className="flex justify-between mt-2 font-bold">
                            <span>Total</span>
                            <span>{calculatedPrice}</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default OrderSummary