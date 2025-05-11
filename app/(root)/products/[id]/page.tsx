import { getProductById } from "@/actions/products-actions";
import ProductDetails from "@/components/store/Product-details";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Metadata } from "next";

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
    const { product, status } = await getProductById({ id })

    if (status === "ERROR" || !product) {
        notFound()
    }

    const { name, images, average_rating, dimensions, shipping_required, total_sales } = product!

    const mainImage = (images[0] != undefined) ? images[0] : {
        src: "/placeholder.svg?height=600&width=600",
        alt: name,
        name: "product",
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Product Images */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                        <Image
                            src={mainImage.src || "/placeholder.svg"}
                            alt={mainImage.alt}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {images.length > 1 && (
                        <div className="grid grid-cols-4 gap-2">
                            {images.map((image, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border bg-background">
                                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Details */}
                <ProductDetails product={product} />

                <Tabs defaultValue="shipping" className="mt-12">
                    <TabsList>
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
                </Tabs>
            </div>
        </div>
    )
}
