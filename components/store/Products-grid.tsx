"use client"

import type React from "react"

import { Product } from "@/types/woocommerce"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import ProductCard from "./Product-Card"

interface ProductsGridProps {
    products: Product[]
    title?: string
    subtitle?: string
}

const ProductsGrid = ({ products, title, subtitle }: ProductsGridProps) => {
    const currentPath = usePathname()


    return (
        <section className="w-full py-16">
            <div className="container px-4 md:px-6">
                {(title || subtitle) && (
                    <div className="mb-10 text-center">
                        {title && <h2 className="text-2xl font-light tracking-tight mb-2">{title}</h2>}
                        {subtitle && <p className="text-muted-foreground text-sm max-w-md mx-auto">{subtitle}</p>}
                    </div>
                )}
                {currentPath === "/" && (
                    <Link href="/products" className="flex justify-end mb-5">
                        <Button >View All</Button>
                    </Link>
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


export default ProductsGrid