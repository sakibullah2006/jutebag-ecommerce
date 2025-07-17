"use server"

import { Product, ProductReview, VariationProduct } from "@/types/product-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { revalidatePath } from "next/cache";

const WooCommerce = new WooCommerceRestApi({
  url: process.env.WORDPRESS_SITE_URL as string,
  consumerKey: process.env.WC_CONSUMER_KEY! as string,
  consumerSecret: process.env.WC_CONSUMER_SECRET! as string,
  version: "wc/v3",
});

export const getProductById = async ({ id }: { id: string }): Promise<{ product: Product, status: "OK" | "ERROR" }> => {
  try {
    const product: Product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products/${id}`, { cache: 'no-store' }).then(async product => await product.json())
    // console.log(product ?? "No product found")
    return {
      product: product,
      status: "OK"
    }
  } catch (error) {
    console.log(`Error fetching products ${error}`)
    return {
      product: {} as Product,
      status: "ERROR"
    }
  }
}

export const getProductVariationsById = async ({ id }: { id: string }): Promise<{ variations?: VariationProduct[], status: "OK" | "ERROR" }> => {
  try {
    const variations = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products/${id}/variations`, { cache: "default", next: { revalidate: 100 } }).then(async variations => await variations.json())
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


export const getAllProductsPaginated = async ({
  params,
}: {
  params?: { category?: string; search?: string; tag?: string; include?: Array<number> };
} = {}): Promise<{
  products: Product[];
  totalItems: number;
  status: 'OK' | 'ERROR';
}> => {
  let allProducts: Product[] = [];
  let page = 1;
  let totalPages = 1;
  let totalItems = 0;

  try {
    do {
      const response = await WooCommerce.get("products", {
        per_page: 100,
        page: page,
        ...(params?.category && { category: params.category }),
        ...(params?.search && { search: params.search }),
        ...(params?.tag && { tag: params.tag }),
        ...(params?.include && { include: params.include.join(',') }),
      });

      if (response.data && Array.isArray(response.data)) {
        allProducts = allProducts.concat(response.data);
      }

      if (page === 1 && response.headers) {
        if (response.headers['x-wp-totalpages']) {
          totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
        }
        if (response.headers['x-wp-total']) {
          totalItems = parseInt(response.headers['x-wp-total'], 10);
        }
      }

      page++;
    } while (page <= totalPages);

    return {
      products: allProducts,
      totalItems: totalItems,
      status: 'OK',
    };
  } catch (error) {
    console.error(`Error fetching all paginated products:`, error);
    return {
      products: [],
      totalItems: 0,
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
      per_page: 100,
      cache: 'force-cache', next: { revalidate: 30 }
      // _nocache: Date.now(), // Append timestamp to prevent caching
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

    revalidatePath('/products/[id]')
    return {
      success: true,
      review: createdReview,
    };
  } catch (error: unknown) {
    console.error("Error creating product review:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create product review",
    };
  }
}