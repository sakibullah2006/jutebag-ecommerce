import { getProductById, getProductReviews, getProductVariationsById } from "@/actions/products-actions";
import ProductDetails from "@/components/store/Product-details";
import ProductReviews from "@/components/store/product-reviews";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductReview } from "@/types/woocommerce";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import sanitize from "sanitize-html";

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
            images: product.images.map((image) => ({
                url: image.src,
                alt: image.alt,
            })),
        },
    };
}

const sampleReviews: ProductReview[] = [
    {
        id: 1,
        date_created: "2024-01-15T10:30:00",
        date_created_gmt: "2024-01-15T10:30:00Z",
        product_id: 123,
        status: "approved",
        reviewer: "Sarah Johnson",
        reviewer_email: "sarah@example.com",
        review:
            "Absolutely love this product! The quality exceeded my expectations and it arrived quickly. The design is beautiful and it works perfectly. Would definitely recommend to others.",
        rating: 5,
        verified: true,
    },
    {
        id: 2,
        date_created: "2024-01-10T14:20:00",
        date_created_gmt: "2024-01-10T14:20:00Z",
        product_id: 123,
        status: "approved",
        reviewer: "Mike Chen",
        reviewer_email: "mike@example.com",
        review:
            "Good product overall. The functionality is solid and it does what it promises. Only minor complaint is that the packaging could be better, but the product itself is great.",
        rating: 4,
        verified: true,
    },
    {
        id: 3,
        date_created: "2024-01-08T09:15:00",
        date_created_gmt: "2024-01-08T09:15:00Z",
        product_id: 123,
        status: "approved",
        reviewer: "Emily Rodriguez",
        reviewer_email: "emily@example.com",
        review:
            "Decent product but not quite what I expected. It works fine but the quality feels a bit cheap for the price. Customer service was helpful though.",
        rating: 3,
        verified: false,
    },
    {
        id: 4,
        date_created: "2024-01-05T16:45:00",
        date_created_gmt: "2024-01-05T16:45:00Z",
        product_id: 123,
        status: "approved",
        reviewer: "David Thompson",
        reviewer_email: "david@example.com",
        review:
            "Fantastic purchase! This has made my daily routine so much easier. The build quality is excellent and it looks great too. Highly recommend!",
        rating: 5,
        verified: true,
    },
]

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params
    console.log("Product ID:", id)
    const [{ product, status }, { variations }, { reviews }] = await Promise.all([
        getProductById({ id }),
        getProductVariationsById({ id }),
        getProductReviews(Number(id))
    ])

    // console.log(variations)
    console.log("Reviews: \n", reviews)

    if (status === "ERROR" || !product) {
        notFound()
    }

    const { average_rating, dimensions, shipping_required, total_sales, description } = product!


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8 max-sm:grid-cols-1 ">


                {/* Product Details */}
                <ProductDetails product={product} variations={variations || []} />

                <Tabs defaultValue="description" className="mt-12 col-span-2 mx-2 max-sm:text-sm">
                    <TabsList>
                        <TabsTrigger value="description">Description</TabsTrigger>
                        <TabsTrigger value="shipping">Shipping</TabsTrigger>
                        {dimensions && (dimensions.length.length > 0 || dimensions.width.length > 0 || dimensions.height.length > 0) && (
                            <TabsTrigger value="details">Product Details</TabsTrigger>
                        )}
                    </TabsList>
                    {dimensions && (dimensions.length.length > 0 || dimensions.width.length > 0 || dimensions.height.length > 0) && (
                        <TabsContent value="details" className="py-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <h3 className="font-medium mb-2">Dimensions</h3>
                                    <p>Length: {dimensions.length}</p>
                                    <p>Width: {dimensions.width}</p>
                                    <p>Height: {dimensions.height}</p>
                                </div>
                                <div>
                                    <h3 className="font-medium mb-2">Additional Information</h3>
                                    <p>Total Sales: {total_sales}</p>
                                    <p>Average Rating: {average_rating}/5</p>
                                </div>
                            </div>
                        </TabsContent>
                    )}
                    <TabsContent value="shipping" className="py-4">
                        <p>
                            {shipping_required
                                ? "This product requires shipping. Shipping costs will be calculated at checkout."
                                : "This product does not require shipping."}
                        </p>
                    </TabsContent>

                    <TabsContent value="description" className="py-4">
                        {description && (
                            <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-600 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic">
                                <div dangerouslySetInnerHTML={{ __html: sanitize(description) }} />
                            </div>
                        )
                        }
                    </TabsContent>
                </Tabs>

            </div>
            <div className="mt-12">
                <ProductReviews reviews={reviews} showProductId={true} />
            </div>
        </div>
    )
}
