'use client';

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";

export default function CartButton() {
    const { totalItems } = useCart();

    return (
        <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-white dark:text-black">
                    {totalItems}
                </span>
            </Button>
        </Link>
    );
} 