// 'use client'

// import { getProducts } from '@/actions/products-actions';
// import Footer from '@/components/Footer/Footer';
// import MenuOne from '@/components/Header/Menu/MenuOne';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne';
// import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb';
// import { Product as ProductType } from '@/types/product-type';
// import { useSearchParams } from 'next/navigation';
// import React, { Suspense, useEffect, useState } from 'react';

// export default function BreadCrumb1() {
//     const searchParams = useSearchParams()
//     const [productData, setProductData] = useState<ProductType[]>([]);
//     const [type, setType] = useState<string | null | undefined>()
//     let datatype = searchParams.get('type')
//     let gender = searchParams.get('gender')
//     let category = searchParams.get('category')

//     useEffect(() => {
//         const fetchProductsData = async () => {
//             const { products, status } = await getProducts({ perPage: 99 });
//             if (status === 'OK') {
//             }
//             setProductData(products);
//             // console.log(products);
//         }

//         fetchProductsData();
//     }, [])

//     useEffect(() => {
//         setType(datatype);
//     }, [datatype]);


//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-transparent" />
//             </div>
//             <ShopBreadCrumb1 data={productData} productPerPage={9} dataType={type} gender={gender} category={category} />
//             <Footer />
//         </>
//     )
// }


import { getAttributesWithTerms, getBrands, getCurrentCurrency, getProductCategories, getProductTags } from '@/actions/data-actions';
import { getProducts } from '@/actions/products-actions';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb';
import { Product as ProductType } from '@/types/product-type';
import { Suspense } from 'react';

// Define props type for the component
type BreadCrumb1Props = {
    searchParams: {
        type?: string;
        gender?: string;
        category?: string;
    };
};

export default async function BreadCrumb1({ searchParams }: BreadCrumb1Props) {
    // Extract search parameters
    const { type, gender, category } = await searchParams;

    // Fetch products server-side
    const { products, status } = await getProducts({ perPage: 99 });
    const [attributes, categories, tags, brands, currency] = await Promise.all([
        getAttributesWithTerms(),
        getProductCategories(),
        getProductTags(),
        getBrands(),
        getCurrentCurrency()
    ])

    // Handle fetch status if needed
    if (status !== 'OK') {
        // You can add error handling here, e.g., return a fallback UI
        return (
            <div>Error fetching products</div>
        );
    }

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className="relative w-full">
                <MenuOne props="bg-transparent" />
            </div>
            <Suspense fallback={<div>Loading breadcrumb...</div>}>
                <ShopBreadCrumb1
                    data={products}
                    productPerPage={9}
                    dataType={type}
                    gender={gender ?? null}
                    category={category ?? null}
                    productOptions={{ attributes, categories, tags, brands, currentCurrency: currency }}
                />
            </Suspense>
            <Footer />
        </>
    );
}