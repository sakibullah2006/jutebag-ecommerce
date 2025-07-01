export interface CountryDataType {
    code: string;
    name: string;
    states: StateDataType[]
}

export interface StateDataType { 
    code: string 
    name: string 
}

export interface TaxtDataType {
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

export interface ShippingMethodDataType {
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

export interface ShippingZoneDataType {
    id: number;
    name: string;
    order: number;
    methods: ShippingMethodDataType[];
    locations: ShippingLocationDataType[];
}
export interface ShippingLocationDataType {
    code: string;
    type: string;
}


export interface CouponDataType {
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



export interface CategorieType {
    id: number;
    name: string;
    slug: string;
    parent: number;
    description: string;
    display: 'default' | 'products' | 'subcategories' | 'both';
    image: {
        id: number;
        date_created: string;
        date_created_gmt: string;
        date_modified: string;
        date_modified_gmt: string;
        src: string;
        name: string;
        alt: string;
    };
    menu_order: number;
    count: number;
}

export interface ProductAttributeType {
    id: number; // Unique identifier for the resource (read-only)
    name: string; // Attribute name (mandatory)
    slug: string; // An alphanumeric identifier for the resource unique to its type
    type: string; // Type of attribute. By default only select is supported
    order_by: 'menu_order' | 'name' | 'name_num' | 'id'; // Default sort order
    has_archives: boolean; // Enable/Disable attribute archives. Default is false
}

export interface AttributeTermType {
    id: number; // Unique identifier for the resource (read-only)
    name: string; // Term name (mandatory)
    slug: string; // An alphanumeric identifier for the resource unique to its type
    description: string; // HTML description of the resource
    menu_order: number; // Menu order, used to custom sort the resource
    count: number; // Number of published products for the resource
}

export interface AttributesWithTermsType {
    attribute: ProductAttributeType; // The attribute details
    terms: AttributeTermType[]; // List of terms for the attribute
}

export interface TagType {
    id: number; // Unique identifier for the resource (read-only)
    name: string; // Tag name (mandatory)
    slug: string; // An alphanumeric identifier unique to its type
    description: string; // HTML description of the resource
    count: number; // Number of published products for the resource
}

export interface CurrencyType {
    code: string; // ISO4217 currency code (read-only)
    name: string; // Full name of currency (read-only)
    symbol: string; // Currency symbol
}

export interface ProductBrandType {
    id: number; // Unique identifier for the brand
    name: string; // Brand name
    slug: string; // An alphanumeric identifier unique to its type
    parent: number; // Parent brand ID
    description: string; // Description of the brand
    display: 'default' | 'products' | 'subcategories' | 'both'; // Display type
    image?: {
        id: number | null; // Image ID or null if no image
        src: string; // Image source URL
        name: string; // Image name
        alt: string; // Image alt text
    } | null; // Image object or null
    menu_order: number; // Menu order for sorting
    count: number; // Number of published products for the brand
   
}