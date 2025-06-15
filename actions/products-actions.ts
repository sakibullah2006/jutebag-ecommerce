"use server"

import { Product, VariationProduct } from "@/types/woocommerce";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";

const WooCommerce = new WooCommerceRestApi({
    url: process.env.WORDPRESS_SITE_URL as string,
    consumerKey: process.env.WC_CONSUMER_KEY! as string,
    consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
    version: "wc/v3",
});

export const getProductById = async ({ id }: { id: string }): Promise<{ product?: Product | null, status: "OK" | "ERROR" }> => {
    try {
        const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products/${id}`, { cache: 'no-store' }).then(async product => await product.json())
        // console.log(product ?? "No product found")
        return {
            product: product,
            status: "OK"
        }
    } catch (error) {
        console.log(`Error fetching products ${error}`)
        return {
            product: null,
            status: "ERROR"
        }
    }
}

export const getProductVariationsById = async ({ id }: { id: string }): Promise<{ variations?: VariationProduct[], status: "OK" | "ERROR" }> => {
    try {
        const variations = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products/${id}/variations`, { cache: "force-cache", next: {revalidate: 100} }).then(async variations => await variations.json())
        // console.log(product ?? "No product found")
        return {
            variations,
            status: "OK"
        }
    } catch (error) {
        console.log(`Error fetching products ${error}`)
        return {
            variations: [],
            status: "ERROR"
        }
    }
}

export const getProducts = async ({
    perPage = 10,
    page = 1,
}: {
    perPage?: number;
    page?: number;
} = {}): Promise<{
    products: Product[];
    status: 'OK' | 'ERROR';
}> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products?per_page=${perPage}&page=${page }&_fields=id,name,price,images,stock_status,average_rating`,
            {cache: 'force-cache',next: { revalidate: 30 }}
        );

        // console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const products = await response.json();

        return {
            products,
            status: 'OK',
        };
    } catch (error) {
        console.error(`Error fetching products:`, error);
        return {
            products: [],
            status: 'ERROR',
        };
    }
};

export async function getProductReviews(productId: number) {
  try {
    // Validate productId
    if (!productId || isNaN(productId)) {
      throw new Error("Invalid product ID");
    }

    // Make API request to get reviews for the specific product
    const response = await WooCommerce.get("products/reviews", {
      product: productId,
    });

    // Check if response contains reviews
    if (response.data && response.data.length > 0) {
      return {
        success: true,
        reviews: response.data,
      };
    } else {
      return {
        success: true,
        reviews: [],
        message: "No reviews found for this product",
      };
    }
  } catch (error) {
    console.error("Error fetching product reviews:", error);
    return {
      success: false,
      message: "Failed to fetch product reviews",
    };
  }
}