"use client"

import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useCallback } from "react"
import QuantityButton from "./Quantity-Button"

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
            <SheetContent className="flex flex-col w-full sm:max-w-lg p-6 pb-2">
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
                                            <div className="grid grid-cols-3 gap-1 max-sm:grid-cols-2 justify-evenly text-base font-medium">
                                                <div className="row-span-2">
                                                    <h3 className="text-start">{item.name} x{item.quantity}</h3>
                                                    <div className="grid grid-cols-1 items-start text-sm">
                                                        {Object.entries(item.selectedAttributes || {}).map(([key, value]) => (
                                                            <p key={key} className="mt-1 text-sm text-muted-foreground">
                                                                {key}: {value}
                                                            </p>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex max-sm:hidden items-center">
                                                    <QuantityButton id={item.id} quantity={item.quantity} />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 ml-auto rounded-r-sm"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Remove item</span>
                                                    </Button>
                                                </div>

                                                <p className="ml-4 text-end">{formatPrice(item.price * item.quantity)}</p>

                                                <div className="hidden max-sm:flex items-center">
                                                    <QuantityButton id={item.id} quantity={item.quantity} />
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-10 w-10 ml-auto rounded-r-sm"
                                                        onClick={() => removeItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span className="sr-only">Remove item</span>
                                                    </Button>
                                                </div>
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
