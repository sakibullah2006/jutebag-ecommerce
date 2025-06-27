export interface Product {
    id: number
    name: string
    slug: string
    permalink: string
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    type: string
    status: string
    featured: boolean
    catalog_visibility: string
    description: string
    short_description: string
    sku: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: string | null
    date_on_sale_from_gmt: string | null
    date_on_sale_to: string | null
    date_on_sale_to_gmt: string | null
    price_html: string
    on_sale: boolean
    purchasable: boolean
    total_sales: number
    virtual: boolean
    downloadable: boolean
    downloads: {
        id: string
        name: string
        file: string
    }[]
    download_limit: number
    download_expiry: number
    external_url?: string
    button_text?: string
    tax_status: string
    tax_class: string
    manage_stock: boolean
    stock_quantity: number | null
    stock_status: 'instock' | 'outofstock' | 'onbackorder'
    backorders: 'no' | 'notify' | 'yes'
    backorders_allowed: boolean
    backordered: boolean
    sold_individually: boolean
    weight: string
    dimensions: {
        length: string
        width: string
        height: string
    }
    shipping_required: boolean
    shipping_taxable: boolean
    shipping_class: string
    shipping_class_id: number
    reviews_allowed: boolean
    average_rating: string
    rating_count: number
    related_ids: number[]
    upsell_ids: number[]
    cross_sell_ids: number[]
    parent_id: number
    purchase_note?: string
    categories: {
        id: number
        name: string
        slug: string
    }[]
    tags: {
        id: number
        name: string
        slug: string
    }[]
    images: {
        id: number
        date_created: string
        date_created_gmt: string
        date_modified: string
        date_modified_gmt: string
        src: string
        name: string
        alt: string
    }[]
    attributes: {
    id: number
        name: string
        position?: number
        visible?: boolean
        variation?: boolean
        options: string[]
    }[]
    default_attributes: {
        id: number
        name: string
        option: string
    }[]
    variations: number[]
    grouped_products: number[]
    menu_order: number
    meta_data: {
        id: number
        key: string
        value: string
    }[]
    selectedAttributes?: {
        [key: string]: string
    }
    has_options: boolean
}
export interface VariationProduct {
    id: number
    date_created: string
    date_created_gmt: string
    date_modified: string
    date_modified_gmt: string
    name: string
    description?: string
    permalink: string
    sku: string
    price: string
    regular_price: string
    sale_price: string
    date_on_sale_from: string | null
    date_on_sale_from_gmt: string | null
    date_on_sale_to: string | null
    date_on_sale_to_gmt: string | null
    on_sale: boolean
    status: 'draft' | 'pending' | 'private' | 'publish'
    purchasable: boolean
    virtual: boolean
    downloadable: boolean
    downloads: {
        id: string
        name: string
        file: string
    }[]
    download_limit: number
    download_expiry: number
    tax_status: 'taxable' | 'shipping' | 'none'
    tax_class: string
    manage_stock: boolean
    stock_quantity: number | null
    stock_status: 'instock' | 'outofstock' | 'onbackorder'
    backorders: 'no' | 'notify' | 'yes'
    backorders_allowed: boolean
    backordered: boolean
    weight: string
    dimensions: {
        length: string
        width: string
        height: string
    }
    shipping_class: string
    shipping_class_id: string
    image: {
        id: number
        date_created: string
        date_created_gmt: string
        date_modified: string
        date_modified_gmt: string
        src: string
        name: string
        alt: string
    }
    attributes: {
        id: number
        slug: string
        name: string
        option: string
    }[]
    menu_order: number
    meta_data: {
        id: number
        key: string
        value: string
    }[]
}

export interface ProductCategory {
    id: number
    name: string
    slug: string
    parent: number
    description: string
    display: 'default' | 'products' | 'subcategories' | 'both'
    image: {
        id: number
        date_created: string
        date_created_gmt: string
        date_modified: string
        date_modified_gmt: string
        src: string
        name: string
        alt: string
    }
    menu_order: number
    count: number
}

export interface ProductReview {
  id: number
  date_created: string
  date_created_gmt: string
  product_id: number
  status: "approved" | "hold" | "spam" | "unspam" | "trash" | "untrash"
  reviewer: string
  reviewer_email: string
  review: string
  rating: number
  verified: boolean
}

export interface ProductReviewsProps {
  reviews: ProductReview[]
  showProductId?: boolean
}
