"use client"

import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { Product } from '@/types/woocommerce';
import { FormInputIcon, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Change this import
import React, { useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const ProductCardButton = ({ product }: { product: Product }) => {
    const { id, name } = product; // Add destructuring
    const { addItem } = useCart();
    const router = useRouter(); // Use next/navigation

    const hasAttributes = (): Boolean => {
        return product.type?.toString().toLowerCase() !== 'variable'.toLowerCase() || false;
    }

    useEffect(() => {
        console.log(hasAttributes(), "hasAttributes")
    }, [])

    const handleAddToCart = (e: React.MouseEvent) => {
        if (!addItem) return;
        e.preventDefault();
        e.stopPropagation();

        addItem(product);
        toast.success(`${product.name} added to cart`, {
            description: "You can view your cart in the top right corner.",
            position: "bottom-left",
        });
    }

    return (
        <>
            {!hasAttributes() ? (
                <Button
                    onClick={handleAddToCart}
                    className={cn(
                        "absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-100 translate-y-0",
                        'md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0',
                    )}
                    aria-label={`Add ${name} to cart`}
                >
                    <Plus className="h-5 w-5 text-gray-800" />
                </Button>
            ) : (
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(`/products/${id}`);
                    }}
                    className={cn(
                        "absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300 opacity-100 translate-y-0",
                        'md:opacity-0 md:translate-y-4 md:group-hover:opacity-100 md:group-hover:translate-y-0',
                    )}
                    aria-label={`Configure ${name}`}
                >
                    <FormInputIcon className="h-5 w-5 text-gray-800" />
                </Button>
            )}
        </>
    )
}

export default ProductCardButton