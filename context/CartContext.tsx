'use client'

import { Product as ProductType, VariationProduct } from '@/types/product-type';
import React, { createContext, useContext, useEffect, useReducer } from 'react';

// --- Interfaces ---
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

// 1. Add the new UPDATE_QUANTITY action type
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

// 2. Add the updateCart function to the context's props
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

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_OR_UPDATE_CART': {
            const { product, quantity, selectedSize, selectedColor, variation_id, selectedVariation } = action.payload;
            const existingItem = state.cartArray.find(item => item.id === product.id);

            if (existingItem) {
                // If item exists, increment its quantity
                return {
                    ...state,
                    cartArray: state.cartArray.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + quantity, selectedSize, selectedColor, variation_id, selectedVariation }
                            : item
                    ),
                };
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
                return {
                    ...state,
                    cartArray: [...state.cartArray, newItem],
                };
            }
        }

        // 3. Implement the logic for the new action
        case 'UPDATE_QUANTITY': {
            const { itemId, quantity } = action.payload;

            // If quantity is 0 or less, remove the item
            if (quantity <= 0) {
                return {
                    ...state,
                    cartArray: state.cartArray.filter(item => item.id.toString() !== itemId),
                };
            }

            // Otherwise, update the quantity of the specific item
            return {
                ...state,
                cartArray: state.cartArray.map(item =>
                    item.id.toString() === itemId
                        ? { ...item, quantity: quantity }
                        : item
                ),
            };
        }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cartArray: state.cartArray.filter((item) => item.id.toString() !== action.payload),
            };

        case 'LOAD_CART':
            return {
                ...state,
                cartArray: action.payload,
            };

        default:
            return state;
    }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, { cartArray: [] });

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

    // 4. Create the updateCart function that dispatches the new action
    const updateCart = (itemId: string, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    };

    return (
        // 5. Expose the new function in the provider's value
        <CartContext.Provider value={{ cartState, addToCart, removeFromCart, updateCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};