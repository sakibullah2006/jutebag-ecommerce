"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
    StoreConfig,
    CountryDataType,
    CategorieType,
    AttributesWithTermsType,
    TagType,
    CurrencyType,
    ProductBrandType
} from '@/types/data-type';
import {
    getStoreSettings,
    getAttributesWithTerms,
    getBrands,
    getCountries,
    getCurrentCurrency,
    getProductCategories,
    getProductTags
} from '@/actions/data-actions';

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

const CACHE_DURATION_MS = 1 * 60 * 60 * 1000; // 1 hour
const LOCAL_STORAGE_KEYS = {
    appData: 'appData',
    lastFetched: 'appDataLastFetched',
};

const AppDataContext = createContext<AppData | null>(null);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
    const [data, setData] = useState<AppData>({
        loading: true,
        countries: [],
        categories: [],
        attributes: [],
        tags: [],
        brands: [],
        currentCurrency: { name: 'Doller', symbol: '$', code: 'USD' },
        storeConfig: null,
    });

    useEffect(() => {
        const initializeData = async () => {
            const lastFetched = localStorage.getItem(LOCAL_STORAGE_KEYS.lastFetched);
            const cachedDataJSON = localStorage.getItem(LOCAL_STORAGE_KEYS.appData);
            const now = Date.now();

            if (cachedDataJSON && lastFetched && (now - parseInt(lastFetched, 10)) < CACHE_DURATION_MS) {
                try {
                    const cachedData = JSON.parse(cachedDataJSON);
                    setData({ loading: false, ...cachedData });
                    console.log("✅ Loaded data from cache.");
                    return;
                } catch (error) {
                    console.error("Failed to parse cached data, fetching new data...", error);
                }
            }

            console.log("Cache stale or not found. Fetching new data from server...");
            try {
                // 5. Fetch storeConfig along with other data
                const [
                    countries,
                    categories,
                    attributes,
                    tags,
                    brands,
                    currentCurrency,
                    storeConfig // Add storeConfig here
                ] = await Promise.all([
                    getCountries(),
                    getProductCategories(),
                    getAttributesWithTerms(),
                    getProductTags(),
                    getBrands(),
                    getCurrentCurrency(),
                    getStoreSettings(), // Call the new action
                ]);

                const freshData = {
                    countries,
                    categories,
                    attributes,
                    tags,
                    brands,
                    currentCurrency,
                    storeConfig, // Include in the fresh data object
                };

                setData({ loading: false, ...freshData });
                localStorage.setItem(LOCAL_STORAGE_KEYS.appData, JSON.stringify(freshData));
                localStorage.setItem(LOCAL_STORAGE_KEYS.lastFetched, now.toString());
                console.log("✅ Fetched and cached new data.");

            } catch (error) {
                console.error("❌ Failed to fetch application data:", error);
                setData(prevData => ({ ...prevData, loading: false }));
            }
        };

        initializeData();
    }, []);

    return (
        <AppDataContext.Provider value={data}>
            {children}
        </AppDataContext.Provider>
    );
};

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (!context) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
};