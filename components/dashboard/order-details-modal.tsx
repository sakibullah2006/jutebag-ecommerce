import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import type { Order } from "@/types/woocommerce"

interface OrderDetailsModalProps {
    order: Order | null
    isOpen: boolean
    onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
    if (!order) return null

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Order Details - #{order.number}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Order Summary */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Order Date</h3>
                            <p>{formatDate(order.date_created)}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Status</h3>
                            <Badge
                                variant={
                                    order.status.toLowerCase() === "completed"
                                        ? "default"
                                        : order.status.toLowerCase() === "cancelled"
                                            ? "destructive"
                                            : "secondary"
                                }
                            >
                                {order.status}
                            </Badge>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Total Items</h3>
                            <p>{order.line_items.reduce((total, item) => total + item.quantity, 0)} items</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm text-muted-foreground">Total Amount</h3>
                            <p className="font-semibold">${order.total}</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Line Items */}
                    <div>
                        <h3 className="font-semibold mb-3">Order Items</h3>
                        <div className="space-y-2">
                            {order.line_items.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                                    <div>
                                        <p className="font-medium">Product ID: {item.product_id}</p>
                                        {item.size && <p className="text-sm text-muted-foreground">Size: {item.size}</p>}
                                        {item.variation_id > 0 && (
                                            <p className="text-sm text-muted-foreground">Variation ID: {item.variation_id}</p>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Billing Information */}
                    <div>
                        <h3 className="font-semibold mb-3">Billing Information</h3>
                        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                            <p className="font-medium">
                                {order.billing.first_name} {order.billing.last_name}
                            </p>
                            <p>{order.billing.address_1}</p>
                            <p>
                                {order.billing.city}, {order.billing.state} {order.billing.postcode}
                            </p>
                            <p>{order.billing.country}</p>
                            <Separator className="my-2" />
                            <p className="text-sm">
                                <span className="font-medium">Email:</span> {order.billing.email}
                            </p>
                            {order.billing.phone && (
                                <p className="text-sm">
                                    <span className="font-medium">Phone:</span> {order.billing.phone}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Shipping Information */}
                    {order.shipping && (
                        <>
                            <Separator />
                            <div>
                                <h3 className="font-semibold mb-3">Shipping Information</h3>
                                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                                    <p className="font-medium">
                                        {order.shipping.first_name} {order.shipping.last_name}
                                    </p>
                                    <p>{order.shipping.address_1}</p>
                                    <p>
                                        {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
                                    </p>
                                    <p>{order.shipping.country}</p>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Order Totals */}
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>${order.total_tax}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total:</span>
                            <span>${order.total}</span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
