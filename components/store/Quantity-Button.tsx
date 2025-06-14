"use client"

import { Minus, Plus } from "lucide-react";
import { Button } from "../ui/button";

import { useCart } from "@/hooks/use-cart";
import React from 'react';

type Props = {
    id: number
    quantity: number
    updateQuantity?: (id: number, quantity: number) => void
}

const QuantityButton = ({ id, quantity, updateQuantity }: Props) => {
    const { updateQuantity: cartUpdateQuantity } = useCart()
    if (!updateQuantity) {
        updateQuantity = cartUpdateQuantity;
    }

    return (
        < div className="flex items-center justify-between border rounded-md" >
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => updateQuantity(id, quantity - 1)}
            >
                <Minus className="h-5 w-5" />
                <span className="sr-only">Decrease quantity</span>
            </Button>
            <span className="min-w-5 text-center text-sm">{quantity}</span>
            <Button
                variant="ghost"
                type="button"
                size="icon"
                className="h-10 w-10 rounded-none"
                onClick={() => updateQuantity(id, quantity + 1)}
            >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Increase quantity</span>
            </Button>
        </div >
    )
}

export default QuantityButton

