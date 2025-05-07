
"use client";

import { Product } from "@/types/woocommerce";
import { ReactNode, createContext, useCallback, useEffect, useState } from "react";

export type CartItem = Pick<Product, "id" | "name" | "images" | "price"> & {
    quantity: number;
    size?: string;
};

interface CartContextType {
    items: CartItem[];
    addItem: (product: Product) => void;
    removeItem: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    cartTotal: number;
    totalItems: number;
    shipping: number | null;
    setShipping: (shipping: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type Props = {
    children: ReactNode;
};

const CartProvider = ({ children }: Props) => {
    // Initialize items from localStorage
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === "undefined") {
            // Return empty array during SSR
            return [];
        }
        try {
            const storedItems = localStorage.getItem("cartItems");
            if (storedItems) {
                const parsedItems = JSON.parse(storedItems);
                // Validate parsed items
                if (Array.isArray(parsedItems) && parsedItems.every(isValidCartItem)) {
                    return parsedItems;
                }
            }
            return [];
        } catch (error) {
            console.error("Error loading cart from localStorage:", error);
            return [];
        }
    });

    const [isOpen, setIsOpen] = useState(false);
    const [shipping, setShipping] = useState<number | null>(null);

    // Validate CartItem structure
    const isValidCartItem = (item: any): item is CartItem => {
        return (
            typeof item === "object" &&
            item !== null &&
            typeof item.id === "number" &&
            typeof item.name === "string" &&
            typeof item.price === "string" &&
            typeof item.quantity === "number" &&
            Array.isArray(item.images) &&
            item.images.every(
                (img: any) =>
                    typeof img === "object" &&
                    typeof img.src === "string" &&
                    typeof img.alt === "string"
            ) &&
            (item.size === undefined || typeof item.size === "string")
        );
    };

    // Sync items to localStorage whenever they change
    useEffect(() => {
        if (typeof window === "undefined") return; // Skip during SSR
        try {
            localStorage.setItem("cartItems", JSON.stringify(items));
        } catch (error) {
            console.error("Error saving cart to localStorage:", error);
        }
    }, [items]);

    const addItem = useCallback((product: Product) => {
        setItems((prevItems) => {
            const existingItem = prevItems.find((item) => item.id === product.id);

            if (existingItem) {
                return prevItems.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...prevItems,
                {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    images: product.images || [],
                    quantity: 1,
                },
            ];
        });
        setIsOpen(true);
    }, []);

    const removeItem = useCallback((productId: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    }, []);

    const updateQuantity = useCallback(
        (productId: number, quantity: number) => {
            if (quantity < 1) {
                removeItem(productId);
                return;
            }

            setItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === productId ? { ...item, quantity } : item
                )
            );
        },
        [removeItem]
    );

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const cartTotal = items.reduce(
        (total, item) => total + Number(item.price) * item.quantity,
        0
    );

    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                isOpen,
                setIsOpen,
                cartTotal,
                totalItems,
                setShipping,
                shipping,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// export default CartProvider;
