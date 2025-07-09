'use client'

// ModalQuickviewContext.tsx
import { Product as ProductType, VariationProduct } from '@/types/product-type';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ModalQuickviewContextProps {
    children: ReactNode;
}

interface ModalQuickviewContextValue {
    selectedProduct: ProductType | null;
    variations?: VariationProduct[];
    openQuickview: (product: ProductType, variations?: VariationProduct[]) => void;
    closeQuickview: () => void;
}

const ModalQuickviewContext = createContext<ModalQuickviewContextValue | undefined>(undefined);

export const ModalQuickviewProvider: React.FC<ModalQuickviewContextProps> = ({ children }) => {
    const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
    const [variations, setVariations] = useState<VariationProduct[] | undefined>(undefined);

    const openQuickview = (product: ProductType, variations?: VariationProduct[]) => {
        setSelectedProduct(product);
        if (variations) {
            setVariations(variations);
        }
    };

    const closeQuickview = () => {
        setSelectedProduct(null);
        setVariations(undefined);
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
