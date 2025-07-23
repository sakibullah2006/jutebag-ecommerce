import { getAllProductsPaginated } from '@/actions/products-actions';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import ShopBreadCrumb1 from '@/components/Shop/ShopBreadCrumb';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { getProductCategories } from '../../actions/data-actions';
import { STOREINFO } from '../../constant/storeConstants';

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
    const [{ products, status }, categories] = await Promise.all([
        getAllProductsPaginated(),
        getProductCategories()

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
                <MenuOne props="bg-transparent" categories={categories} />
            </div>
            <Suspense fallback={<div>Loading breadcrumb...</div>}>
                <ShopBreadCrumb1
                    data={products}
                    productPerPage={9}
                    dataType={type}
                    gender={gender ?? null}
                    category={category ?? null}
                />
            </Suspense>
            <Footer />
        </>
    );
}

export const metadata: Metadata = {
    title: `Shop - ${STOREINFO.name}`,
    description: `Discover our latest collection of products at ${STOREINFO.name}. Browse through our wide selection of quality items with great prices.`,
    keywords: ['shop', 'products', `${STOREINFO.name}`, 'online store', 'fashion', 'clothing'],
    openGraph: {
        title: `Shop - ${STOREINFO.name}`,
        description: `Discover our latest collection of products at ${STOREINFO.name}. Browse through our wide selection of quality items with great prices.`,
        type: 'website',
        url: '/shop',
        siteName: `${STOREINFO.name}`,
    },
    twitter: {
        card: 'summary_large_image',
        title: `Shop - ${STOREINFO.name}`,
        description: `Discover our latest collection of products at ${STOREINFO.name}. Browse through our wide selection of quality items with great prices.`,
    },
};