import React from 'react'
import { CartProvider } from '@/context/CartContext'
import { ModalCartProvider } from '@/context/ModalCartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { ModalWishlistProvider } from '@/context/ModalWishlistContext'
import { CompareProvider } from '@/context/CompareContext'
import { ModalCompareProvider } from '@/context/ModalCompareContext'
import { ModalSearchProvider } from '@/context/ModalSearchContext'
import { ModalQuickviewProvider } from '@/context/ModalQuickviewContext'
import { AuthProvider } from '@/context/AuthContext'
import { getProductCategories, getCountries, getAttributesWithTerms, getProductTags, getCurrentCurrency, getStoreSettings, getBrands } from '../actions/data-actions'
import { AppDataProvider } from '../context/AppDataContext'

const GlobalProvider: React.FC<{ children: React.ReactNode }> = async ({ children }) => {


    const [
        categoriesResult,
        countriesResult,
        attributesResult,
        tagsResult,
        currentCurrencyResult,
        storeConfigResult,
        brandsResult
    ] = await Promise.allSettled([
        getProductCategories(),
        getCountries(),
        getAttributesWithTerms(),
        getProductTags(),
        getCurrentCurrency(),
        getStoreSettings(),
        getBrands()
    ]);

    const categories = categoriesResult.status === 'fulfilled' ? categoriesResult.value : [];
    const countries = countriesResult.status === 'fulfilled' ? countriesResult.value : [];
    const attributes = attributesResult.status === 'fulfilled' ? attributesResult.value : [];
    const tags = tagsResult.status === 'fulfilled' ? tagsResult.value : [];
    const currentCurrency = currentCurrencyResult.status === 'fulfilled' ? currentCurrencyResult.value : null;
    const storeConfig = storeConfigResult.status === 'fulfilled' ? storeConfigResult.value : null;
    const brands = brandsResult.status === 'fulfilled' ? brandsResult.value : [];

    if (categoriesResult.status === 'rejected') console.error("Failed to fetch categories:", categoriesResult.reason);
    if (countriesResult.status === 'rejected') console.error("Failed to fetch countries:", countriesResult.reason);
    if (attributesResult.status === 'rejected') console.error("Failed to fetch attributes:", attributesResult.reason);
    if (tagsResult.status === 'rejected') console.error("Failed to fetch tags:", tagsResult.reason);
    if (currentCurrencyResult.status === 'rejected') console.error("Failed to fetch current currency:", currentCurrencyResult.reason);
    if (storeConfigResult.status === 'rejected') console.error("Failed to fetch store config:", storeConfigResult.reason);
    if (brandsResult.status === 'rejected') console.error("Failed to fetch brands:", brandsResult.reason);

    return (
        <AuthProvider>
            <CartProvider>
                <AppDataProvider
                    countries={countries}
                    categories={categories}
                    attributes={attributes}
                    tags={tags}
                    brands={brands}
                    currentCurrency={currentCurrency}
                    storeConfig={storeConfig}
                >
                    <ModalCartProvider>
                        <WishlistProvider>
                            <ModalWishlistProvider>
                                <CompareProvider>
                                    <ModalCompareProvider>
                                        <ModalSearchProvider>
                                            <ModalQuickviewProvider>
                                                {children}
                                            </ModalQuickviewProvider>
                                        </ModalSearchProvider>
                                    </ModalCompareProvider>
                                </CompareProvider>
                            </ModalWishlistProvider>
                        </WishlistProvider>
                    </ModalCartProvider>
                </AppDataProvider>
            </CartProvider>
        </AuthProvider>
    )
}

export default GlobalProvider