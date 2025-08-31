

import { getAllProductsPaginated, getProductById, getProductReviews, getProductVariationsById } from '@/actions/products-actions';
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import Default from '@/components/Product/Detail/Default';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductCategories } from '../../../../actions/data-actions';
import { STOREINFO } from '../../../../constant/storeConstants';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const { product, status } = await getProductById({ id });

    if (status === "ERROR" || !product) {
        return notFound()
    }

    return {
        title: product.name + " | " + STOREINFO.name,

        description: product.short_description || "View details about this product.",
        openGraph: {
            title: product.name,
            description: product.short_description || "View details about this product.",
            images: product.images.map((image: { src: string; alt: string; }) => ({
                url: image.src,
                alt: image.alt,
            })),
        },
    };
}


interface ProductDefaultProps {
    params: { id: string };
}

const ProductDefault = async ({ params }: ProductDefaultProps) => {
    const { id: productId } = await params || "1";

    const [{ product, status }, { variations }, { reviews }, categories] = await Promise.all([
        getProductById({ id: productId }),
        getProductVariationsById({ id: productId }),
        getProductReviews(Number(productId)),
        getProductCategories(),
    ])

    const include = product.related_ids?.map((item) => Number(item))

    const { products: relatedProducts } = await getAllProductsPaginated({ params: { include } });

    // console.log(variations)

    if (status === "ERROR" || !product) {
        notFound()
    }

    return (
        <>
            <div id="header h-fit" className="relative w-full">
                <BreadcrumbProduct productName={product.name} productId={productId} />
            </div>
            <Default key={productId} data={product} productId={productId} variations={variations} relatedProducts={relatedProducts} reviews={reviews || []} />
        </>
    );
};

export default ProductDefault;