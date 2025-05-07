import { Product } from "@/types/woocommerce";


// export const getProducts = async (): Promise<Product[]> => {
//     try {
//         const products = await fetch("http://localhost:3000/api/woocommerce/products?_fields=id,name,price,description,images", {cache: 'force-cache',next: { revalidate: 3600 }})

//         console.log(products)
//         return await products.json()
//     } catch (error) {
//         console.log(`Error fetching products ${error}`)
//         return []
//     }
// }

export const getProductById = async ({ id }: { id: string }): Promise<{ product?: Product | null, status: "OK" | "ERROR" }> => {
    try {
        const product = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products/${id}`, { cache: 'no-store' }).then(async product => await product.json())
        console.log(product ?? "No product found")
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

export const getProducts = async ({
    perPage = 10,
    page = 1,
}: {
    perPage?: number;
    page?: number;
} = {}): Promise<{
    products: Product[];
    totalItems: number;
    totalPages: number;
    status: 'OK' | 'ERROR';
}> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/woocommerce/products?per_page=${perPage}&page=${page }&_fields=id,name,price,images,stock_status,average_rating`,
            {cache: 'force-cache',next: { revalidate: 3600 }}
        );

        console.log(response)

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch products');
        }

        const products = await response.json();
        const totalItems = parseInt(response.headers.get('X-WP-Total') || '0', 10);
        const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1', 10);

        return {
            products,
            totalItems,
            totalPages,
            status: 'OK',
        };
    } catch (error) {
        console.error(`Error fetching products:`, error);
        return {
            products: [],
            totalItems: 0,
            totalPages: 1,
            status: 'ERROR',
        };
    }
};