"use client"

import type React from "react"

import { useCart } from "@/hooks/use-cart"
import { cn } from "@/lib/utils"
import { Product } from "@/types/woocommerce"
import { Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

interface ProductsGridProps {
    products: Product[]
    title?: string
    subtitle?: string
}

const ProductsGrid = ({ products, title = "Collection", subtitle }: ProductsGridProps) => {


    return (
        <section className="w-full py-16">
            <div className="container px-4 md:px-6">
                {(title || subtitle) && (
                    <div className="mb-10 text-center">
                        {title && <h2 className="text-2xl font-light tracking-tight mb-2">{title}</h2>}
                        {subtitle && <p className="text-muted-foreground text-sm max-w-md mx-auto">{subtitle}</p>}
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export const ProductCard = ({ product }: { product: Product }) => {
    const { id, name, price, images } = product
    const [isHovered, setIsHovered] = useState(false)
    const { addItem } = useCart()


    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        addItem(product)
        // Here you would typically dispatch an action to add the product to the cart
    }

    return (
        <Link
            href={`/products/${id}`}
            className="group block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden mb-4">
                <div className="aspect-square bg-gray-50">
                    <Image
                        src={images[0].src || "/placeholder.svg"}
                        alt={images[0].alt}
                        width={400}
                        height={400}
                        className={cn(
                            "object-cover w-full h-full transition-transform duration-700",
                            isHovered ? "scale-105" : "scale-100",
                        )}
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    className={cn(
                        "absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-100 translate-y-0",
                        'md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0'
                    )}
                    aria-label={`Add ${name} to cart`}
                >
                    <Plus className="h-5 w-5 text-gray-800" />
                </button>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="font-mono text-lg">{name}</h3>
                <p className="text-md font-mono">${Number(price).toFixed(2)}</p>
            </div>
        </Link>
    )
}

export default ProductsGrid