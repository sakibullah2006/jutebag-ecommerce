"use client";

import { createContext, useContext, ReactNode } from 'react';
import {
    StoreConfig,
    CountryDataType,
    CategorieType,
    AttributesWithTermsType,
    TagType,
    CurrencyType,
    ProductBrandType
} from '@/types/data-type';

// The data structure provided by the context
interface AppData {
    loading: boolean;
    countries: CountryDataType[];
    categories: CategorieType[];
    attributes: AttributesWithTermsType[];
    tags: TagType[];
    brands: ProductBrandType[];
    currentCurrency: CurrencyType | null;
    storeConfig: StoreConfig | null;
}

const AppDataContext = createContext<AppData | null>(null);

// 1. Define the props that will be passed from layout.tsx
interface AppDataProviderProps {
    children: ReactNode;
    countries: CountryDataType[];
    categories: CategorieType[];
    attributes: AttributesWithTermsType[];
    tags: TagType[];
    brands: ProductBrandType[];
    currentCurrency: CurrencyType | null;
    storeConfig: StoreConfig | null;
}

// 2. Update the provider to accept the pre-fetched data as props
export const AppDataProvider = ({
    children,
    countries,
    categories,
    attributes,
    tags,
    brands,
    currentCurrency,
    storeConfig,
}: AppDataProviderProps) => {


    const data: AppData = {
        loading: false,
        countries: countries || [],
        categories: categories || [],
        attributes: attributes || [],
        tags: tags || [],
        brands: brands || [],
        currentCurrency,
        storeConfig,
    };

    return (
        <AppDataContext.Provider value={data}>
            {children}
        </AppDataContext.Provider>
    );
};

// The custom hook for consuming the context remains the same
export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
};