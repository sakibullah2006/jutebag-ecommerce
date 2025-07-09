"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    CountryDataType,
    CategorieType,
    AttributesWithTermsType,
    TagType,
    CurrencyType,
    ProductBrandType
} from '@/types/data-type';
import { getAttributesWithTerms, getBrands, getCountries, getCurrentCurrency, getProductCategories, getProductTags } from '@/actions/data-actions';

interface AppData {
    loading: boolean;
    countries: CountryDataType[];
    categories: CategorieType[];
    attributes: AttributesWithTermsType[];
    tags: TagType[];
    brands: ProductBrandType[];
    currentCurrency: CurrencyType | null;
}

const CACHE_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hours
const LOCAL_STORAGE_KEYS = {
    appData: 'appData',
    lastFetched: 'appDataLastFetched',
};

const AppDataContext = createContext<AppData | null>(null);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AppData>({
        loading: true, // Start in a loading state
        countries: [],
        categories: [],
        attributes: [],
        tags: [],
        brands: [],
        currentCurrency: { name: 'Doller', symbol: '$', code: 'USD' } // Default value,
    });

    useEffect(() => {
        const initializeData = async () => {
            const lastFetched = localStorage.getItem(LOCAL_STORAGE_KEYS.lastFetched);
            const cachedDataJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.appData);
            const now = Date.now();

            // Check if valid, non-expired data exists in localStorage
            if (cachedDataJSON && lastFetched && (now - parseInt(lastFetched, 10)) < CACHE_DURATION_MS) {
                try {
                    const cachedData = JSON.parse(cachedDataJSON);
                    setData({ loading: false, ...cachedData });
                    console.log("✅ Loaded data from cache.");
                    return; // Stop execution if cache is valid
                } catch (error) {
                    console.error("Failed to parse cached data, fetching new data...", error);
                }
            }

            // If no cache or cache is stale, fetch new data
            console.log("Cache stale or not found. Fetching new data from server...");
            try {
                // Use Promise.all to fetch all data concurrently for efficiency
                const [
                    countries,
                    categories,
                    attributes,
                    tags,
                    brands,
                    currentCurrency
                ] = await Promise.all([
                    getCountries(),
                    getProductCategories(),
                    getAttributesWithTerms(),
                    getProductTags(),
                    getBrands(),
                    getCurrentCurrency(),
                ]);

                const freshData = {
                    countries,
                    categories,
                    attributes,
                    tags,
                    brands,
                    currentCurrency,
                };

                // Update state
                setData({ loading: false, ...freshData });

                // Update localStorage
                localStorage.setItem(LOCAL_STORAGE_KEYS.appData, JSON.stringify(freshData));
                localStorage.setItem(LOCAL_STORAGE_KEYS.lastFetched, now.toString());
                console.log("✅ Fetched and cached new data.");

            } catch (error) {
                console.error("❌ Failed to fetch application data:", error);
                setData(prevData => ({ ...prevData, loading: false })); // Stop loading on error
            }
        };

        initializeData();
    }, []); // Empty dependency array ensures this runs only once on client mount

    return (
        <AppDataContext.Provider value={data}>
            {children}
        </AppDataContext.Provider>
    );
};

// 5. Create a custom hook for easy consumption
export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
};