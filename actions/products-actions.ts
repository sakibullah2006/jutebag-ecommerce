"use server"

import { Product, ProductReview, VariationProduct } from "@/types/woocommerce";
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
    perPage = 50,
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
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products?per_page=${perPage}&page=${page}`,
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

    // Make API request to get reviews with no-cache headers
    const response = await WooCommerce.get("products/reviews", {
      product: productId,
      _nocache: Date.now(), // Append timestamp to prevent caching
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

export async function createProductReview(reviewData: {
  productId: number;
  reviewer: string;
  reviewerEmail: string;
  review: string;
  rating: number;
}): Promise<{
  success: boolean;
  review?: ProductReview;
  message?: string;
}> {
  try {
    // Validate input data
    if (!reviewData.productId || isNaN(reviewData.productId)) {
      throw new Error("Invalid product ID");
    }
    if (!reviewData.reviewer || reviewData.reviewer.trim() === "") {
      throw new Error("Reviewer name is required");
    }
    if (!reviewData.reviewerEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reviewData.reviewerEmail)) {
      throw new Error("Valid reviewer email is required");
    }
    if (!reviewData.review || reviewData.review.trim() === "") {
      throw new Error("Review content is required");
    }
    if (!reviewData.rating || reviewData.rating < 0 || reviewData.rating > 5) {
      throw new Error("Rating must be between 0 and 5");
    }

    // Make API request to create a review
    const response = await WooCommerce.post("products/reviews", {
      product_id: reviewData.productId,
      reviewer: reviewData.reviewer,
      reviewer_email: reviewData.reviewerEmail,
      review: reviewData.review,
      rating: reviewData.rating,
      status: "approved", // Default to 'hold' for moderation
    });

    // Map response to ProductReview type
    const createdReview: ProductReview = {
      id: response.data.id,
      date_created: response.data.date_created,
      date_created_gmt: response.data.date_created_gmt,
      product_id: response.data.product_id,
      status: response.data.status,
      reviewer: response.data.reviewer,
      reviewer_email: response.data.reviewer_email,
      review: response.data.review,
      rating: response.data.rating,
      verified: response.data.verified,
    };

    return {
      success: true,
      review: createdReview,
    };
  } catch (error: any) {
    console.error("Error creating product review:", error);
    return {
      success: false,
      message: error.message || "Failed to create product review",
    };
  }
}