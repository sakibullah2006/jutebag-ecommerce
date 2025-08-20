import { Deal } from "../types/deal-type";

/**
 * Fetches deals from the EcoGoodsDirect API.
 * @returns Promise<Deal[]> - An array of Deal objects.
 * @throws Error if the fetch fails or the response is invalid.
 */
export async function getDeals(): Promise<Deal[]> {
    try {
        const endpoint = `${process.env.WORDPRESS_SITE_URL}/wp-json/my-deals/v1/deals`;
        const response = await fetch(endpoint, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            },
            next: {
                revalidate: 100
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch deals: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
            throw new Error("API response is not an array");
        }

        // Optionally: validate each deal object here
        return data as Deal[];
    } catch (error) {
        console.log('Error fetching deals:', error);
        return [];
    }
}
