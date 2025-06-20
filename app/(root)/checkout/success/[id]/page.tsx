import { getOrder } from "@/actions/order-actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import { CheckCircle } from "lucide-react"
import { notFound } from "next/navigation"


export async function generateMetadata({ params }: { params: { id: string } }) {
    const order = await getOrder((await params).id);

    if (!order) {
        return {
            title: "Order Not Found",
            description: "The order you are looking for does not exist.",
        };
    }

    return {
        title: `Thank You for Your Order #${order.id}`,
        description: `Order #${order.id} placed on ${formatDate(order.date_created)}.`,
    };
}



export default async function ThankYouPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const order = await getOrder(id)
    console.log(order)

    if (!order) {
        notFound()
    }

    const { shipping: shippingAddress, billing } = order!
    const estimatedDelivery = new Date()
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5) // Assuming 5 days for delivery

    return (
        <div className="container max-w-4xl py-12 px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center text-center mb-8">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold tracking-tight">Thank You for Your Order!</h1>
                <p className="text-muted-foreground mt-2">We&apos;ve received your order and are getting it ready to ship.</p>
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                    <CardDescription>
                        Order #{order.id!} • Placed on {formatDate(order?.date_created)}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium mb-2">Order Status</h3>
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-50 text-green-700 border-green-200">
                                {order?.status === "processing" ? "Processing" : order?.status}
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <h3 className="font-medium mb-2">Shipping Address</h3>
                                <address className="not-italic text-sm text-muted-foreground">
                                    {shippingAddress?.first_name} {shippingAddress?.last_name}
                                    <br />
                                    {shippingAddress?.address_1}
                                    <br />
                                    {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.postcode}
                                    <br />
                                    {shippingAddress?.country}
                                </address>
                            </div>

                            <div>
                                <h3 className="font-medium mb-2">Billing Information</h3>
                                <p className="text-sm text-muted-foreground">
                                    {billing?.first_name} {billing?.last_name}
                                    <br />
                                    {billing?.email}
                                    <br />
                                    {billing?.phone}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-medium mb-2">Payment</h3>
                            <p className="text-sm text-muted-foreground">
                                Total: <span className="font-medium text-foreground">{order?.currency_symbol}{order?.total}</span>
                            </p>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="font-medium mb-2">Estimated Delivery</h3>
                            <p className="text-sm text-muted-foreground">{formatDate(estimatedDelivery.toISOString())}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What&apos;s Next?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                        <li>
                            <span className="font-medium text-foreground">Order Confirmation Email</span> - We&apos;ve sent a confirmation
                            to {billing?.email} with your order details.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Processing</span> - Your order is being prepared for
                            shipping.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Shipping Notification</span> - You&apos;ll receive an email with
                            tracking information once your order ships.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Delivery</span> - Your package should arrive within 5-7
                            business days.
                        </li>
                    </ol>
                </CardContent>
                {/* <CardFooter className="flex flex-col sm:flex-row gap-4">
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                        <Link href="/">Continue Shopping</Link>
                    </Button>
                </CardFooter> */}
            </Card>
        </div>
    )
}
