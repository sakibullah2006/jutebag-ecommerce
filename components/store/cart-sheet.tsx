"use client"

import { Minus, Plus, ShoppingBag, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCallback } from "react"

export function CartSheet() {
    const { items, isOpen, setIsOpen, removeItem, updateQuantity, cartTotal, totalItems } = useCart()
    const router = useRouter()

    const handleCheckout = useCallback(() => {
        // Handle checkout logic here
        router.push("/checkout")
        setIsOpen(false)
    }, [router, setIsOpen])

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="flex flex-col w-full sm:max-w-lg p-6">
                <SheetHeader className="space-y-2 pr-6">
                    <SheetTitle className="flex items-center">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Cart ({totalItems})
                    </SheetTitle>
                </SheetHeader>

                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center flex-1 px-6">
                        <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
                        <p className="text-xl font-medium text-muted-foreground">Your cart is empty</p>
                        <SheetClose asChild>
                            <Button variant="outline" className="mt-6">
                                Continue Shopping
                            </Button>
                        </SheetClose>
                    </div>
                ) : (
                    <>
                        <div className="flex-1 overflow-y-auto py-6">
                            <ul className="divide-y">
                                {items.map((item) => (
                                    <li key={item.id} className="py-4 flex">
                                        <div className="h-15 w-15 flex-shrink-0 overflow-hidden rounded-md border">
                                            <Image
                                                src={item.images[0]?.src || "/placeholder.svg"}
                                                alt={item.images[0]?.alt || item.name}
                                                width={32}
                                                height={32}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col gap-4">
                                            <div className="flex justify-between text-base font-medium">
                                                <h3>{item.name}</h3>

                                                <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                            <div className="flex justify-between text-sm px-3">
                                                {item.selectedAttributes?.Color && <p className="mt-1 text-sm text-muted-foreground">Color: {item.selectedAttributes.Color}</p>}
                                                {item.selectedAttributes?.Size && <p className="mt-1 text-sm text-muted-foreground">Size: {item.selectedAttributes.Size}</p>}
                                            </div>
                                            <div className="flex items-center justify-between">

                                                <div className="flex items-center border rounded-md">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-none"
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    >
                                                        <Minus className="h-3 w-3" />
                                                        <span className="sr-only">Decrease quantity</span>
                                                    </Button>
                                                    <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-none"
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    >
                                                        <Plus className="h-3 w-3" />
                                                        <span className="sr-only">Increase quantity</span>
                                                    </Button>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-muted-foreground self-end"
                                                >
                                                    <X className="h-4 w-4 mr-1" />
                                                    Remove
                                                </Button>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <SheetFooter className="border-t pt-4">
                            <div className="w-full space-y-4">
                                <div className="flex items-center justify-between text-base">
                                    <p>Subtotal</p>
                                    <p className="font-medium">{formatPrice(cartTotal)}</p>
                                </div>
                                <div className="flex items-center justify-between text-base">
                                    <p>Shipping: </p>
                                    <span>calculate at checkout</span>
                                </div>
                                <div className="flex items-center justify-between text-base font-medium">
                                    <p>Total</p>
                                    <p>{formatPrice(cartTotal)}</p>
                                </div>
                                <Button className="w-full" onClick={handleCheckout}>Checkout</Button>
                                {/* <SheetClose asChild>
                                    <Button variant="outline" className="w-full">
                                        Continue Shopping
                                    </Button>
                                </SheetClose> */}
                            </div>
                        </SheetFooter>
                    </>
                )}
            </SheetContent>
        </Sheet>
    )
}
