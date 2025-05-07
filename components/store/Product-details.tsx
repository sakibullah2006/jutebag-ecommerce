"use client"

import { useCart } from '@/hooks/use-cart'
import { Product } from '@/types/woocommerce'
import { Separator } from '@radix-ui/react-select'
import { CreditCard, ShoppingCart, Star } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'
import sanitizeHtml from 'sanitize-html'
import { Badge } from '../ui/badge'
import { Button, } from '../ui/button'



type Props = {
    product: Product
}

export default function ProductDetails({ product }: Props) {
    //deconstructing product
    const { name, description, price, categories, featured, stock_quantity, stock_status, average_rating } = product
    const { addItem } = useCart()

    const handleAddtoCart = () => {
        // Add to cart logic here
        addItem(product)
    }

    const handleBuyNow = () => {
        // Buy now logic here
        addItem(product)
        // Redirect to checkout page 
        redirect("/checkout")
    }


    const isInStock = stock_status === "instock"

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{name}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`h-5 w-5 ${i < Number.parseInt(average_rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                            />
                        ))}
                    </div>
                    <span className="text-muted-foreground">({average_rating})</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-3xl font-bold">${Number(price).toFixed(2)}</span>
                {featured && <Badge>Featured</Badge>}
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <span className="font-medium">Availability:</span>
                    <Badge variant={isInStock ? "default" : "destructive"}>{isInStock ? "In Stock" : "Out of Stock"}</Badge>
                    {isInStock && stock_quantity && (
                        <span className="text-sm text-muted-foreground">({stock_quantity} available)</span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium">Categories:</span>
                    <div className="flex flex-wrap gap-1">
                        {categories.map((category) => (
                            <Badge key={category.id} variant="outline">
                                {category.name}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>

            {description && (
                <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(description) }} />
                </div>
            )}

            <Separator />

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1" size="lg"
                        disabled={!isInStock}
                        onClick={handleAddtoCart}
                    >
                        <ShoppingCart className="mr-2 h-5 w-5" />
                        Add to Cart
                    </Button>
                    <Button className="flex-1 bg-green-500 text-white font-bold hover:bg-green-300" size="lg" variant="secondary" disabled={!isInStock}
                        onClick={handleBuyNow}
                    >
                        <CreditCard className="mr-2 h-5 w-5" />
                        Buy Now
                    </Button>
                </div>
            </div>
        </div>

    )
}