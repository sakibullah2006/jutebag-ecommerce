// 'use client'
// import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct';
// import Footer from '@/components/Footer/Footer';
// import MenuOne from '@/components/Header/Menu/MenuOne';
// import TopNavOne from '@/components/Header/TopNav/TopNavOne';
// import Default from '@/components/Product/Detail/Default';
// import productData from '@/data/Product.json';
// import { useSearchParams } from 'next/navigation';

// const ProductDefault = () => {
//     const searchParams = useSearchParams()
//     let productId = searchParams.get('id')

//     if (productId === null) {
//         productId = '1'
//     }

//     return (
//         <>
//             <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
//             <div id="header" className='relative w-full'>
//                 <MenuOne props="bg-white" />
//                 <BreadcrumbProduct data={productData} productPage='default' productId={productId} />
//             </div>
//             <Default data={productData} productId={productId} />
//             <Footer />
//         </>
//     )
// }

// export default ProductDefault


import { getAllProductsPaginated, getProductById, getProductReviews, getProductVariationsById } from '@/actions/products-actions';
import BreadcrumbProduct from '@/components/Breadcrumb/BreadcrumbProduct';
import Footer from '@/components/Footer/Footer';
import MenuOne from '@/components/Header/Menu/MenuOne';
import TopNavOne from '@/components/Header/TopNav/TopNavOne';
import Default from '@/components/Product/Detail/Default';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = await params;
    const { product, status } = await getProductById({ id });

    if (status === "ERROR" || !product) {
        return {
            title: "Product Not Found",
            description: "The product you are looking for does not exist.",
        };
    }

    return {
        title: product.name,
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
    console.log("Product ID:", productId)

    const [{ product, status }, { variations }, { reviews }] = await Promise.all([
        getProductById({ id: productId }),
        getProductVariationsById({ id: productId }),
        getProductReviews(Number(productId))
    ])

    const include = product.related_ids.map((item) => Number(item))

    const { products: relatedProducts } = await getAllProductsPaginated({ params: { include } });
    console.log("Related Products: \n", relatedProducts)

    // console.log(variations)
    console.log("Reviews: \n", reviews)

    if (status === "ERROR" || !product) {
        notFound()
    }

    return (
        <>
            <TopNavOne props="style-one bg-black" slogan="New customers save 10% with the code GET10" />
            <div id="header" className="relative w-full">
                <MenuOne props="bg-white" />
                <BreadcrumbProduct productName={product.name} productId={productId} />
            </div>
            <Default data={product} productId={productId} varations={variations} relatedProducts={relatedProducts} reviews={reviews || []} />
            <Footer />
        </>
    );
};

export default ProductDefault;