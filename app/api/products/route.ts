import { NextRequest, NextResponse } from 'next/server';
import { wooCommerceFetch } from '@/actions/wooCommerceFetch';
import { Product } from '@/types/product-type';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);

        // Extract query parameters
        const page = parseInt(searchParams.get('page') || '1', 10);
        const search = searchParams.get('search') || undefined;
        const category = searchParams.get('category') || undefined;
        const tag = searchParams.get('tag') || undefined;
        // const gender = searchParams.get('gender') || undefined;
        const per_page = parseInt(searchParams.get('per_page') || '6', 10);

        // Build query parameters for WooCommerce API
        const queryParams = new URLSearchParams();
        queryParams.append('per_page', per_page.toString());
        queryParams.append('page', page.toString());

        // Add optional filters if provided
        if (category) queryParams.append('category', category);
        if (search) queryParams.append('search', search);
        if (tag) queryParams.append('tag', tag);
        // if (gender) queryParams.append('gender', gender);

        const endpoint = `products?${queryParams.toString()}`;

        // Fetch products with revalidation tags
        const { data, headers } = await wooCommerceFetch(endpoint, {
            tags: ['products']
        });

        // Extract pagination information from headers
        const totalItems = parseInt(headers.get('x-wp-total') || '0', 10);
        const totalPages = parseInt(headers.get('x-wp-totalpages') || '1', 10);

        console.log("total Products", totalItems);
        console.log("total pages", totalPages);

        const response = {
            products: data as Product[],
            totalItems: totalItems,
            totalPages: totalPages,
            status: 'OK' as const,
        };

        return NextResponse.json(response);

    } catch (error) {
        console.log("Unexpected Error", error);

        const errorResponse = {
            products: [],
            totalItems: 0,
            totalPages: 0,
            status: 'ERROR' as const,
        };

        return NextResponse.json(errorResponse, { status: 500 });
    }
}
