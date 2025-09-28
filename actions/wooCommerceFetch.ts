"use server"

const API_URL = process.env.WORDPRESS_SITE_URL as string;
const CONSUMER_KEY = process.env.WC_CONSUMER_KEY as string;
const CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET as string;


/**
 * A centralized fetch wrapper for WooCommerce API calls.
 * This ensures consistent authentication and allows us to pass Next.js caching options.
 */
export async function wooCommerceFetch(endpoint: string, nextConfig: NextFetchRequestConfig, cache?: RequestCache) {
    const url = `${API_URL}/wp-json/wc/v3/${endpoint}`;
    const encodedAuth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Basic ${encodedAuth}`,
            },
            cache: cache,
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