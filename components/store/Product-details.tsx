"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import type { Product, VariationProduct } from "@/types/woocommerce";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreditCard, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import QuantityButton from "./Quantity-Button";

type Props = {
    product: Product;
    variations: VariationProduct[];
};

export default function ProductDetails({ product, variations }: Props) {
    // Destructuring product
    const {
        name,
        images,
        price,
        categories,
        featured,
        stock_quantity,
        stock_status,
        average_rating,
        default_attributes,
        attributes,
    } = product;

    const [quantity, setQuantity] = useState(1);
    const [mainImage, setMainImage] = useState<{ src: string; alt: string; name: string }>(images[0]);
    const [variationId, setVariationId] = useState<number | null>(null);
    const [variationPrice, setVariationPrice] = useState<string | null>(null);
    const isInStock = stock_status === "instock";
    // console.log("stock status:", isInStock);

    const { addItem, setIsOpen } = useCart();

    useEffect(() => {
        // console.log(product.default_attributes, "default attributes")
        console.log("Product details component mounted with product:", product);
    }, [])

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) {
            console.warn("Quantity cannot be less than 1");
            return;
        }
        setQuantity(newQuantity);
    }

    // Create a dynamic Zod schema based on product attributes
    const createProductSchema = (product: Product) => {
        const schemaFields: Record<string, z.ZodType> = {};

        product.attributes.forEach((attr) => {
            schemaFields[attr.slug] = z.string({
                required_error: `Please select a ${attr.name}`,
            });
        });

        return z.object(schemaFields);
    };

    const productSchema = createProductSchema(product);

    // Get default values from product
    const getDefaultValues = () => {
        const defaults: Record<string, string> = {};

        default_attributes.forEach((attr) => {
            const attribute = attributes.find((a) => a.name === attr.name);
            if (attribute) {
                defaults[attribute.slug] = attr.option;
            }
        });

        return defaults;
    };

    // Initialize the form
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: getDefaultValues(),
    });

    // Find matching variation based on selected attributes
    const findMatchingVariation = (values: z.infer<typeof productSchema>) => {
        return variations.find((variation) => {
            // Create a map of variation attributes for easier comparison
            const variationAttrs = variation.attributes.reduce(
                (acc, attr) => ({ ...acc, [attr.slug]: attr.option }),
                {} as Record<string, string>,
            );

            // filter out attributes that has attribute.variation as true
            const filteredAttributes = attributes.filter((attr) => attr.variation);
            // console.log("filtered attributes:", filteredAttributes)

            // Check if all selected attributes match the variation's attributes
            return filteredAttributes.every((attr) => {
                const selectedValue = values[attr.slug];
                return selectedValue && variationAttrs[attr.slug] === selectedValue;
            });
        });
    };

    // Handle attribute change
    const handleAttributeChange = () => {
        const values = form.getValues();
        const matchingVariation = findMatchingVariation(values);

        if (matchingVariation) {
            setVariationId(matchingVariation.id);
            if (matchingVariation.image) {
                setMainImage(matchingVariation.image);
            }
            setVariationPrice(matchingVariation.price);
            // console.log("Matching variation:", matchingVariation.id);
            // console.log(values)
        } else {
            setVariationId(null);
            setMainImage(images[0]); // Fallback to default product image
            setVariationPrice(null);
        }
    };

    const onSubmit = (values: z.infer<typeof productSchema>) => {
        const selectedAttributes: Record<string, string> = {};

        attributes.forEach((attr) => {
            if (values[attr.slug]) {
                selectedAttributes[attr.name] = values[attr.slug];
            }
        });

        const productWithAttributes = {
            ...product,
            variation_id: variationId || undefined,
            selectedAttributes,
        };

        // console.log("Product with attributes:", productWithAttributes);

        addItem(productWithAttributes);
    };

    const handleBuyNow = () => {
        form.handleSubmit((values) => {
            const selectedAttributes: Record<string, string> = {};

            attributes.forEach((attr) => {
                if (values[attr.slug]) {
                    selectedAttributes[attr.name] = values[attr.slug];
                }
            });

            const productWithAttributes = {
                ...product,
                variation_id: variationId || undefined,
                selectedAttributes,
            };

            addItem(productWithAttributes);
            setIsOpen(false);
            redirect("/checkout");
        })();
    };

    return (
        <>
            {/* Product Images */}
            <div className="max-sm:col-span-2 space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg border bg-background w-full h-fit  max-h-[400px] ">
                    <Image
                        src={mainImage.src || "/placeholder.svg"}
                        alt={mainImage.alt || ""}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {images.length > 1 && (
                    <div className="grid grid-cols-5 gap-2 overflow-hidden max-w-full">
                        {images.map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-square overflow-hidden rounded-lg border bg-background cursor-pointer"
                                onClick={() => setMainImage(image)}
                            >
                                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-contain" />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Product Details */}
            <div className="space-y-6 max-sm:col-span-2 h-full">
                <div>
                    <h1 className="text-3xl font-bold">{name}</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-5 w-5 ${i < Number.parseInt(average_rating) ? "fill-primary text-primary" : "fill-muted text-muted-foreground"}`}
                                />
                            ))}
                        </div>
                        <span className="text-muted-foreground">({average_rating})</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold">
                        ${Number(variationPrice || price).toFixed(2)}
                    </span>
                    {featured && <Badge>Featured</Badge>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">Availability:</span>
                        <Badge variant={isInStock ? "default" : "destructive"}>
                            {isInStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                        {isInStock && stock_quantity && (
                            <span className="text-sm text-muted-foreground">({stock_quantity} available)</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="font-medium">Categories:</span>
                        <div className="flex flex-wrap gap-1">
                            {categories.map((category) => (
                                <Badge key={category.id} variant="outline">
                                    {category.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>


                <Form {...form}>

                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Attributes Selection Form */}
                        {(product.attributes.length > 0) && (
                            <>
                                <Separator />
                                {attributes.map((attribute) => (
                                    <FormField
                                        key={attribute.id}
                                        control={form.control}
                                        name={attribute.slug}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{attribute.name}</FormLabel>
                                                <Select
                                                    onValueChange={(value) => {
                                                        field.onChange(value);
                                                        handleAttributeChange();
                                                    }}
                                                    defaultValue={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={`Select ${attribute.name}`} />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {attribute.options.map((option) => (
                                                            <SelectItem key={option} value={option}>
                                                                {option}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                                <Separator />
                            </>
                        )}



                        <div className="space-y-4 h-full w-full">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-30">
                                        <QuantityButton id={product.id} quantity={quantity} updateQuantity={updateQuantity} />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="flex-1 py-4 px-2 text-lg font-bold"
                                        size="default"
                                        disabled={(product.attributes.length > 0 && !variationId)}
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to Cart
                                    </Button>
                                </div>
                                <Button
                                    type="button"
                                    className="bg-green-500 text-white text-lg font-bold hover:bg-green-700 flex-1 py-4 px-2"
                                    size="default"
                                    variant="secondary"
                                    disabled={(product.attributes.length > 0 && variationId === null)}
                                    onClick={handleBuyNow}
                                >
                                    <CreditCard className="mr-2 h-5 w-5" />
                                    Buy Now
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </div >
        </>
    );
}