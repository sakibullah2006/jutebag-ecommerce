"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/woocommerce";
import { ChevronDown, ChevronUp, Clock } from "lucide-react";
import { useState } from "react";


export default function OrderCard({ order }: { order: Order }) {
    const [isOpen, setIsOpen] = useState(false);

    const formattedDate = new Date(order.date_created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "on-hold":
                return "bg-amber-100 text-amber-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                        <CardTitle className="text-base">Order #{order.id}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3" />
                            {formattedDate}
                        </CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge className={`${getStatusColor(order.status)} capitalize`}>{order.status}</Badge>
                        <span className="font-medium">{order.total}</span>
                    </div>
                </div>
            </CardHeader>

            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
                <CardContent className="pb-2 pt-0">
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
                            {isOpen ? (
                                <>
                                    <ChevronUp className="h-4 w-4" />
                                    <span>Hide details</span>
                                </>
                            ) : (
                                <>
                                    <ChevronDown className="h-4 w-4" />
                                    <span>View details</span>
                                </>
                            )}
                        </Button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="mt-4">
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-sm font-medium mb-2">Items</h4>
                                <ul className="space-y-2">
                                    {order.line_items.map((item, index) => (
                                        <li key={index} className="flex justify-between text-sm">
                                            <span>
                                                Product #{item.product_id} {item.size && `(${item.size})`}
                                            </span>
                                            <span>Qty: {item.quantity}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Separator />

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Shipping Address</h4>
                                    {order.shipping ? (
                                        <p className="text-sm text-muted-foreground">
                                            {order.shipping.first_name} {order.shipping.last_name}
                                            <br />
                                            {order.shipping.address_1}
                                            <br />
                                            {order.shipping.city}, {order.shipping.state} {order.shipping.postcode}
                                            <br />
                                            {order.shipping.country}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No shipping information</p>
                                    )}
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Billing Address</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {order.billing.first_name} {order.billing.last_name}
                                        <br />
                                        {order.billing.address_1}
                                        <br />
                                        {order.billing.city}, {order.billing.state} {order.billing.postcode}
                                        <br />
                                        {order.billing.country}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    size="sm"
                                    variant="outline"
                                // onClick={() => toast.info("View invoice feature coming soon!")}
                                >
                                    View Invoice
                                </Button>
                            </div>
                        </div>
                    </CollapsibleContent>
                </CardContent>
            </Collapsible>
        </Card>
    );
}