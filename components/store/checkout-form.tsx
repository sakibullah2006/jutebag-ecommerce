"use client"

import { LineItem, createOrder } from "@/actions/order-actions"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { OrderData, formSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Banknote } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"



type FormValues = z.infer<typeof formSchema>

export function CheckoutForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formError, setFormError] = useState<string | null>(null)
    const [formSuccess, setFormSuccess] = useState<string | null>(null)
    const { setShipping, items, clearCart } = useCart()
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            delivery: {
                first_name: "",
                last_name: "",
                address_1: "",
                city: "Dhaka",
                state: "",
                postcode: "",
                country: "",
                email: "",
                phone: "",
            },
            terms: false,
        },
    })

    async function onSubmit(data: FormValues) {
        setIsSubmitting(true)
        setFormError(null)
        setFormSuccess(null)

        try {
            // Create the order object
            const orderData: OrderData = {
                billing: data.delivery,
                shipping: data.delivery, // Same address for billing and shipping
                payment_method: "cod",
            }

            const lineItems: LineItem[] = items.map((item) => {
                return {
                    product_id: item.id,
                    // name: item.name,
                    // price: item.price,
                    // subtotal: item.price * item.quantity,
                    quantity: item.quantity,
                    variation_id: item.variation_id,
                }
            })

            // Submit the order
            const result = await createOrder({ orderData, lineItems })

            if (result.success) {
                setFormSuccess(
                    "Order placed successfully! Your order will be delivered to your address with cash on delivery option.",
                )
                clearCart()
                toast.success(`Order placed successfully!`)
                router.push(`/checkout/success/${result.order?.id}`);
            } else {
                toast.error(`Failed to place order: ${result.error}`)
            }
        } catch (e) {
            setFormError(`Failed to place order: ${e}`)
        }
        finally {
            setIsSubmitting(false)
        }
    }

    const calculateShipping = () => {
        if (form.getValues("delivery").city.toLowerCase() === "dhaka" && form.getValues("delivery").state!.toLowerCase() === "dhaka") {
            setShipping(1.20)
        } else (
            setShipping(5.00)
        )
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 overflow-hidden">
                <div>
                    <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="delivery.first_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.last_name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="delivery.address_1"
                        render={({ field }) => (
                            <FormItem className="mt-4">
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <FormField
                            control={form.control}
                            name="delivery.city"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl onChange={calculateShipping}>
                                        <Input placeholder="Dhaka" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.state"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>District</FormLabel>
                                    <FormControl onChange={calculateShipping}>
                                        <Input placeholder="Dhaka" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.postcode"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Postal Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="10001" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="delivery.country"
                        render={({ field }) => (
                            <FormItem className="mt-4 overflow-hidden">
                                <FormLabel>Country</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl >
                                        <SelectTrigger className="overflow-hidden">
                                            <SelectValue placeholder="Select a country" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="BD">Bangladesh</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                            control={form.control}
                            name="delivery.email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john.doe@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="delivery.phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="(123) 456-7890" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <div className="flex items-center p-4 bg-muted/50 rounded-lg">
                    <Banknote className="h-5 w-5 mr-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                        This order will be delivered with Cash on Delivery payment option.
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>I agree to the terms and conditions</FormLabel>
                                <FormDescription>
                                    By checking this box, you agree to our{" "}
                                    <a href="#" className="text-primary underline">
                                        Terms of Service
                                    </a>{" "}
                                    and{" "}
                                    <a href="#" className="text-primary underline">
                                        Privacy Policy
                                    </a>
                                    .
                                </FormDescription>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />

                {formError && <div className="bg-destructive/15 text-destructive p-3 rounded-md">{formError}</div>}

                {formSuccess && <div className="bg-green-100 text-green-800 p-3 rounded-md">{formSuccess}</div>}

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Place Order (Cash on Delivery)"}
                </Button>
            </form>
        </Form>
    )
}
