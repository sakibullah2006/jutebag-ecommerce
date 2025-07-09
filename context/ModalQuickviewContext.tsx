'use client'

// ModalQuickviewContext.tsx
import { Product as ProductType, VariationProduct } from '@/types/product-type';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { getProductVariationsById } from '../actions/products-actions';

interface ModalQuickviewContextProps {
    children: ReactNode;
}

interface ModalQuickviewContextValue {
    selectedProduct: ProductType | null;
    openQuickview: (product: ProductType) => void;
    closeQuickview: () => void;
}

const ModalQuickviewContext = createContext<ModalQuickviewContextValue | undefined>(undefined);

export const ModalQuickviewProvider: React.FC<ModalQuickviewContextProps> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

    const openQuickview = async (product: ProductType) => {
        setSelectedProduct(product);
    };

    const closeQuickview = () => {
        setSelectedProduct(null);
    };

    return (
        <ModalQuickviewContext.Provider value={{ selectedProduct, openQuickview, closeQuickview }}>
            {children}
        </ModalQuickviewContext.Provider>
    );
};

export const useModalQuickviewContext = () => {
    const context = useContext(ModalQuickviewContext);
    if (!context) {
        throw new Error('useModalQuickviewContext must be used within a ModalQuickviewProvider');
    }
    return context;
};
