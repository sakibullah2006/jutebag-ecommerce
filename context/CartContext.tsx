'use client'

import { Product as ProductType, VariationProduct } from '@/types/product-type';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { getAllProductsPaginated } from '@/actions/products-actions';

// --- Interfaces (Unchanged) ---
export interface CartItem extends ProductType {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    variation_id?: string;
    selectedVariation?: VariationProduct;
}

interface CartState {
    cartArray: CartItem[];
}

type CartAction =
    | {
        type: 'ADD_OR_UPDATE_CART';
        payload: {
            product: ProductType;
            quantity: number;
            selectedSize: string;
            selectedColor: string;
            variation_id?: string;
            selectedVariation?: VariationProduct;
        }
    }
    | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
    | { type: 'REMOVE_FROM_CART'; payload: string }
    | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextProps {
    cartState: CartState;
    addToCart: (
        product: ProductType,
        quantity: number,
        selectedSize: string,
        selectedColor: string,
        variation_id?: string,
        selectedVariation?: VariationProduct
    ) => void;
    removeFromCart: (itemId: string) => void;
    updateCart: (itemId: string, quantity: number) => void;
}

// --- Constants (Unchanged) ---
const REFRESH_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const LOCAL_STORAGE_KEYS = {
    cart: 'cartItems',
    lastRefreshed: 'cartLastRefreshed',
};

const CartContext = createContext<CartContextProps | undefined>(undefined);

// --- Updated Reducer ---
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_CART': {
            const { product, quantity, selectedSize, selectedColor, variation_id, selectedVariation } = action.payload;

            // An item is unique based on its main ID and its variation ID (if it exists)
            const findIndex = state.cartArray.findIndex(item =>
                item.id === product.id &&
                (item.variation_id ?? null) === (variation_id ?? null)
            );

            if (findIndex > -1) {
                // If item with the same variation exists, update its quantity
                const newCartArray = [...state.cartArray];
                const existingItem = newCartArray[findIndex];
                existingItem.quantity += quantity;
                return { ...state, cartArray: newCartArray };
            } else {
                // If item doesn't exist, add it as a new item
                const newItem: CartItem = {
                    ...product,
                    quantity,
                    selectedSize,
                    selectedColor,
                    variation_id,
                    selectedVariation,
                };
                return { ...state, cartArray: [...state.cartArray, newItem] };
            }
        }
        case 'UPDATE_QUANTITY': {
            const { itemId, quantity } = action.payload;
            if (quantity <= 0) {
                return { ...state, cartArray: state.cartArray.filter(item => item.id.toString() !== itemId) };
            }
            return {
                ...state,
                cartArray: state.cartArray.map(item =>
                    item.id.toString() === itemId ? { ...item, quantity } : item
                ),
            };
        }
        case 'REMOVE_FROM_CART':
            return { ...state, cartArray: state.cartArray.filter((item) => item.id.toString() !== action.payload) };
        case 'LOAD_CART':
            return { ...state, cartArray: action.payload };
        default:
            return state;
    }
};

// --- Updated Provider ---
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });

    // 1. Add a state to track if the context has been hydrated from localStorage
    const [isHydrated, setIsHydrated] = useState(false);

    // Effect for loading the cart from localStorage on initial load
    useEffect(() => {
        try {
            const storedCart = localStorage.getItem(LOCAL_STORAGE_KEYS.cart);
            if (storedCart) {
                dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
        // 2. Set hydration to true after the first load attempt
        setIsHydrated(true);
    }, []);

    // Effect for saving the cart to localStorage whenever it changes
    useEffect(() => {
        // 3. Add a guard clause to prevent saving until after hydration
        if (!isHydrated) {
            return;
        }
        try {
            localStorage.setItem(LOCAL_STORAGE_KEYS.cart, JSON.stringify(cartState.cartArray));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cartState.cartArray, isHydrated]);

    // Effect for refreshing product data in the cart periodically
    useEffect(() => {
        if (!isHydrated || cartState.cartArray.length === 0) return;

        const refreshCartData = async () => {
            const lastRefreshed = localStorage.getItem(LOCAL_STORAGE_KEYS.lastRefreshed);
            const now = Date.now();

            if (!lastRefreshed || (now - parseInt(lastRefreshed, 10)) > REFRESH_INTERVAL_MS) {
                console.log("Refreshing cart product data...");
                try {
                    const productIds = cartState.cartArray.map(item => item.id);
                    const { products: refreshedProducts, status } = await getAllProductsPaginated({ params: { include: productIds } });

                    if (status === 'OK' && refreshedProducts.length > 0) {
                        const updatedCart = cartState.cartArray.map(cartItem => {
                            const refreshedProduct = refreshedProducts.find(p => p.id === cartItem.id);
                            // Keep quantity and variation details from the original cart item
                            return refreshedProduct ? { ...cartItem, ...refreshedProduct } : cartItem;
                        });

                        dispatch({ type: 'LOAD_CART', payload: updatedCart });
                        localStorage.setItem(LOCAL_STORAGE_KEYS.lastRefreshed, now.toString());
                        console.log("✅ Cart data refreshed and updated.");
                    }
                } catch (error) {
                    console.error("❌ Failed to refresh cart data:", error);
                }
            }
        };

        refreshCartData();
    }, [isHydrated, cartState.cartArray]);

    const addToCart = (
        product: ProductType,
        quantity: number,
        selectedSize: string,
        selectedColor: string,
        variation_id?: string,
        selectedVariation?: VariationProduct
    ) => {
        dispatch({
            type: 'ADD_OR_UPDATE_CART',
            payload: { product, quantity, selectedSize, selectedColor, variation_id, selectedVariation }
        });
    };

    const removeFromCart = (itemId: string) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: itemId });
    };

    const updateCart = (itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    };

    return (
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

// useCart hook remains the same
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};