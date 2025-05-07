export interface Product {
    id: number
    name: string
    price: number
    featured: boolean
    date_on_sale_from: Date
    date_on_sale_to: Date
    total_sales: number
    stock_status: string 
    stock_quantity: number | null
    shipping_required: boolean
    average_rating: string
    dimensions: {
        length: string,
        width: string,
        height: string
    },
    categories: {id: number, name: string, slug: string}[]
    regular_price: string
    images: { src: string, alt: string, name: string }[]
    description?: string
}

export interface Order {
    id: number;
    status: string;
    total: string;
    date_created: string;
    billing: {
        first_name: string;
        last_name: string;
        address_1: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        email: string;
        phone: string;
    };
    shipping?: {
        first_name: string;
        last_name: string;
        address_1: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
    line_items: { product_id: number; quantity: number, size?: string }[];
}