"use server"

import { Product, ProductReview, VariationProduct } from "@/types/product-type";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import { revalidateTag } from "next/cache";

const API_URL = process.env.WORDPRESS_SITE_URL as string;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY as string;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET as string;


const WooCommerce = new WooCommerceRestApi({
  url: API_URL,
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  version: "wc/v3",
});

/**
 * A centralized fetch wrapper for WooCommerce API calls.
 * This ensures consistent authentication and allows us to pass Next.js caching options.
 */
export async function wooCommerceFetch(endpoint: string, nextConfig: NextFetchRequestConfig) {
  const url = `${API_URL}/wp-json/wc/v3/${endpoint}`;
  const encodedAuth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

  try {
    const response = await fetch(url, {
      headers: {
        'Authorization': `Basic ${encodedAuth}`,
      },
      next: nextConfig
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // We need the headers for pagination
    const headers = response.headers;
    const data = await response.json();

    return { data, headers };

  } catch (error) {
    console.error(`Error fetching from WooCommerce endpoint "${endpoint}":`, error);
    throw error; // Re-throw to be handled by the calling function
  }
}

export const getProductById = async ({ id }: { id: string }): Promise<{ product: Product, status: "OK" | "ERROR" }> => {
  try {
    // Add specific and general tags for flexible revalidation
    const { data } = await wooCommerceFetch(`products/${id}`, {
      tags: [`product:${id}`, 'products']
    });
    return {
      product: data,
      status: "OK"
    }
  } catch (error) {
    // Error is already logged in wooCommerceFetch
    return {
      product: {} as Product,
      status: "ERROR"
    }
  }
}

export const getProductVariationsById = async ({ id, per_page }: { id: string, per_page?: number }): Promise<{ variations?: VariationProduct[], status: "OK" | "ERROR" }> => {

  const queryParams = new URLSearchParams();
  queryParams.append('per_page', String(per_page ?? 100));
  // if (params?.search) queryParams.append('search', params.search);

  try {
    // Variations are part of a product, so they share the same tags
    const { data } = await wooCommerceFetch(`products/${id}/variations?${queryParams.toString()}`, {
      tags: [`product:${id}`, 'products']
    });
    return {
      variations: data,
      status: "OK"
    }
  } catch (error) {
    return {
      variations: [],
      status: "ERROR"
    }
  }
}

// export const getAllProductsPaginated = async ({
//   params,
// }: {
//   params?: { categoryId?: number; search?: string; tag?: string; include?: Array<number>, gender?: string };
// } = {}): Promise<{
//   products: Product[];
//   totalItems: number;
//   status: 'OK' | 'ERROR';
// }> => {
//   let allProducts: Product[] = [];
//   let page = 1;
//   let totalPages = 1;
//   let totalItems = 0;

//   try {
//     do {
//       const response = await WooCommerce.get("products", {
//         per_page: 100,
//         page: page,
//         cache: "default", next: { revalidate: 100 },
//         ...(params?.categoryId && { category: params.categoryId }),
//         ...(params?.search && { search: params.search }),
//         ...(params?.tag && { tag: params.tag }),
//         ...(params?.gender && { gender: params.gender }),
//         ...(params?.include && { include: params.include.join(',') }),
//       });

//       if (response.data && Array.isArray(response.data)) {
//         allProducts = allProducts.concat(response.data);
//       }

//       if (page === 1 && response.headers) {
//         if (response.headers['x-wp-totalpages']) {
//           totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
//         }
//         if (response.headers['x-wp-total']) {
//           totalItems = parseInt(response.headers['x-wp-total'], 10);
//         }
//       }

//       page++;
//     } while (page <= totalPages);

//     return {
//       products: allProducts,
//       totalItems: totalItems,
//       status: 'OK',
//     };
//   } catch (error) {
//     console.error(`Error fetching all paginated products:`, error);
//     return {
//       products: [],
//       totalItems: 0,
//       status: 'ERROR',
//     };
//   }
// };


export const getAllProductsPaginated = async ({
  params,
}: {
  params?: { category?: string; search?: string; tag?: string; include?: Array<number> };
} = {}): Promise<{
  products: Product[];
  totalItems: number;
  status: 'OK' | 'ERROR';
}> => {
  // Note: This function fetches ALL products, which can be slow. 
  // For large stores, consider implementing server-side pagination instead of this loop.
  let allProducts: Product[] = [];
  let page = 1;
  let totalPages = 1;

  const queryParams = new URLSearchParams();
  queryParams.append('per_page', '100');
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.tag) queryParams.append('tag', params.tag);
  if (params?.include) queryParams.append('include', params.include.join(','));

  try {
    do {
      queryParams.set('page', page.toString());
      const endpoint = `products?${queryParams.toString()}`;

      // We tag this generic fetch with the 'products' tag
      const { data, headers } = await wooCommerceFetch(endpoint, {
        tags: ['products']
      });

      if (data && Array.isArray(data)) {
        allProducts = allProducts.concat(data);
      }

      if (page === 1) {
        totalPages = parseInt(headers.get('x-wp-totalpages') || '1', 10);
      }

      page++;
    } while (page <= totalPages);

    // The totalItems count can be derived from the first page's header
    // This part of the logic needs adjustment if you don't fetch all pages.
    const firstPageResponse = await wooCommerceFetch(`products?${queryParams.toString()}&page=1`, {
      tags: ['products']
    });
    const totalItems = parseInt(firstPageResponse.headers.get('x-wp-total') || '0', 10);

    return {
      products: allProducts,
      totalItems: totalItems,
      status: 'OK',
    };
  } catch (error) {
    return {
      products: [],
      totalItems: 0,
      status: 'ERROR',
    };
  }
};

// export async function getProductReviews(productId: number) {
//   try {
//     // Validate productId
//     if (!productId || isNaN(productId)) {
//       throw new Error("Invalid product ID");
//     }

//     // Make API request to get reviews with no-cache headers
//     const response = await WooCommerce.get("products/reviews", {
//       product: productId,
//       per_page: 100,
//       cache: 'force-cache', next: { revalidate: 30 }
//       // _nocache: Date.now(), // Append timestamp to prevent caching
//     });

//     // Check if response contains reviews
//     if (response.data && response.data.length > 0) {
//       return {
//         success: true,
//         reviews: response.data,
//       };
//     } else {
//       return {
//         success: true,
//         reviews: [],
//         message: "No reviews found for this product",
//       };
//     }
//   } catch (error) {
//     console.error("Error fetching product reviews:", error);
//     return {
//       success: false,
//       message: "Failed to fetch product reviews",
//     };
//   }
// }

export async function getProductReviews(productId: number) {
  if (!productId || isNaN(productId)) {
    return { success: false, message: "Invalid product ID" };
  }
  try {
    const queryParams = new URLSearchParams()
    queryParams.append('product', productId.toString())

    // Tag reviews specifically to a product
    const { data } = await wooCommerceFetch(`products/reviews?${queryParams.toString()}`, {
      tags: [`reviews:${productId}`]
    });

    return {
      success: true,
      reviews: data,
    };
  } catch (error) {
    return { success: false, message: "Failed to fetch product reviews" };
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
  } catch (error: unknown) {
    console.error("Error creating product review:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create product review",
    };
  }
}