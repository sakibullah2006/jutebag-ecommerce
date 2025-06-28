export interface CountryData {
    code: string;
    name: string;
    states: StateData[]
}

export interface StateData { 
    code: string 
    name: string 
}

export interface TaxtData {
    id: number;
    country: string;
    state: string;
    postcode: string;
    city: string;
    rate: string;
    name: string;
    priority: number;
    compound: boolean;
    shipping: boolean;
    order: number;
    class: string;
    postcodes: string[];
    cities: string[];
}

export interface ShippingMethodData {
    id: number;
    instance_id: number;
    title: string;
    order: number;
    enabled: boolean;
    method_id: string;
    method_title: string;
    method_description: string;
    settings: {
        title: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
        tax_status: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
            options: {
                [key: string]: string;
            };
        };
        cost?: {
            id: string;
            label: string;
            description: string;
            type: string;
            value: string;
            default: string;
            tip: string;
            placeholder: string;
        };
        min_amount: {
            value: string
        }
    };
}

export interface ShippingZoneData {
    id: number;
    name: string;
    order: number;
    methods: ShippingMethodData[];
    locations: ShippingLocationData[];
}
export interface ShippingLocationData {
    code: string;
    type: string;
}

export interface CurrencyData {
    code: string;
    name: string;
    symbol: string;
}

export interface CouponData {
    id: number;
    code: string;
    amount: string;
    date_created: string;
    date_created_gmt: string;
    date_modified: string;
    date_modified_gmt: string;
    discount_type: string;
    description: string;
    date_expires: string | null;
    date_expires_gmt: string | null;
    usage_count: number;
    individual_use: boolean;
    product_ids: number[];
    excluded_product_ids: number[];
    usage_limit: number | null;
    usage_limit_per_user: number | null;
    limit_usage_to_x_items: number | null;
    free_shipping: boolean;
    product_categories: number[];
    excluded_product_categories: number[];
    exclude_sale_items: boolean;
    minimum_amount: string;
    maximum_amount: string;
    email_restrictions: string[];
    used_by: string[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    meta_data: any[];
}