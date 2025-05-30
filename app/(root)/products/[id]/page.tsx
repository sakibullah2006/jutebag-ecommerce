import { getProductById, getProductVariationsById } from "@/actions/products-actions";
import ProductDetails from "@/components/store/Product-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default async function ProductPage({ params }: { params: { id: string } }) {
    const { id } = await params
    const [{ product, status }, { variations }] = await Promise.all([
        getProductById({ id }),
        getProductVariationsById({ id }),
    ])

    // console.log(variations)

    if (status === "ERROR" || !product) {
        notFound()
    }

    const { average_rating, dimensions, shipping_required, total_sales, description } = product!


    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">


                {/* Product Details */}
                <ProductDetails product={product} variations={variations || []} />

                <Tabs defaultValue="description" className="mt-12 col-span-2 mx-6 max-sm:text-sm">
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
        </div>
    )
}
