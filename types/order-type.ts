export interface Order {
    id: number;
    status: string;
    parent_id: string;
    number: string;
    total_tax: string;
    total: string;
    date_created: string;
    currency: string;
    currency_symbol: string;
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
    line_items: {
        product_id: number;
        quantity: number;
        size?: string;
        variation_id: number;
    }[];
    customer_id: number;
}
