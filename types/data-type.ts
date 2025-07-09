export interface CountryDataType {
    code: string;
    name: string;
    states: StateDataType[]
}

export interface StateDataType {
    code: string
    name: string
}

export interface TaxDataType {
    id: number; // Unique identifier for the resource (read-only)
    country: string; // Country ISO 3166 code
    state: string; // State code
    postcode: string; // Postcode/ZIP (deprecated as of WooCommerce 5.3, use postcodes instead)
    city: string; // City name (deprecated as of WooCommerce 5.3, use cities instead)
    postcodes: string[]; // Postcodes/ZIPs (introduced in WooCommerce 5.3)
    cities: string[]; // City names (introduced in WooCommerce 5.3)
    rate: string; // Tax rate
    name: string; // Tax rate name
    priority: number; // Tax priority (default is 1)
    compound: boolean; // Whether this is a compound tax rate (default is false)
    shipping: boolean; // Whether this tax rate applies to shipping (default is true)
    order: number; // Order that will appear in queries
    class: string; // Tax class (default is standard)
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
    id: number; // Unique identifier for the resource (read-only)
    name: string; // Shipping zone name (mandatory)
    order: number; // Shipping zone order
    methods?: ShippingMethodDataType[]; // Shipping methods for this zone
    locations?: ShippingLocationDataType[]; // Locations covered by this zone
}

/**
 * Represents a shipping location with its code and type.
 * 
 * @interface ShippingLocationDataType
 * @property {string} code - Shipping zone location code.
 * @property {string} type - Shipping zone location type. Options: postcode, state, country and continent. Default is country.
 */
export interface ShippingLocationDataType {
    code: string;
    type: string;
}

export interface CouponMetaDataType {
    id: number; // Meta ID (read-only)
    key: string; // Meta key
    value: string; // Meta value
}

export interface CouponDataType {
    id: number; // Unique identifier for the object (read-only)
    code: string; // Coupon code (mandatory)
    amount: string; // The amount of discount. Should always be numeric, even if setting a percentage.
    date_created: string; // The date the coupon was created, in the site's timezone (read-only)
    date_created_gmt: string; // The date the coupon was created, as GMT (read-only)
    date_modified: string; // The date the coupon was last modified, in the site's timezone (read-only)
    date_modified_gmt: string; // The date the coupon was last modified, as GMT (read-only)
    discount_type: 'percent' | 'fixed_cart' | 'fixed_product'; // Type of discount
    description: string; // Coupon description
    date_expires: string | null; // The date the coupon expires, in the site's timezone
    date_expires_gmt: string | null; // The date the coupon expires, as GMT
    usage_count: number; // Number of times the coupon has been used already (read-only)
    individual_use: boolean; // If true, the coupon can only be used individually
    product_ids: number[]; // List of product IDs the coupon can be used on
    excluded_product_ids: number[]; // List of product IDs the coupon cannot be used on
    usage_limit: number | null; // How many times the coupon can be used in total
    usage_limit_per_user: number | null; // How many times the coupon can be used per customer
    limit_usage_to_x_items: number | null; // Max number of items in the cart the coupon can be applied to
    free_shipping: boolean; // If true, this coupon will enable free shipping
    product_categories: number[]; // List of category IDs the coupon applies to
    excluded_product_categories: number[]; // List of category IDs the coupon does not apply to
    exclude_sale_items: boolean; // If true, this coupon will not be applied to items that have sale prices
    minimum_amount: string; // Minimum order amount that needs to be in the cart before coupon applies
    maximum_amount: string; // Maximum order amount allowed when using the coupon
    email_restrictions: string[]; // List of email addresses that can use this coupon
    used_by: string[]; // List of user IDs (or guest email addresses) that have used the coupon (read-only)
    meta_data: CouponMetaDataType[]; // Meta data
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