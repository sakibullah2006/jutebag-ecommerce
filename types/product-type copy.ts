export interface Product {
    id: number
    name: string
    price: string
    
    regular_price: string
    sale_price: string
    featured: boolean
    date_on_sale_from: string | null
    date_on_sale_to: string | null
    total_sales: number
    purchasable: boolean
    stock_status: string
    stock_quantity: number | null
    shipping_required: boolean
    average_rating: string
    dimensions: {
        length: string,
        width: string,
        height: string
    },
    categories: { id: number, name: string, slug: string }[]
    images: { id: number, src: string, alt: string, name: string }[]
    attributes: {
        id: number,
        name: string,
        slug: string,
        position?: number,
        visible?: boolean,
        variation?: boolean,
        options: string[]
    }[]
    default_attributes: {
        id: number,
        name: string,
        option: string
    }[]
    selectedAttributes?: {
        [key: string]: string
    },
    description: string
    short_description: string
    variations: number[]
    variation_id?: number
    type: string
    status: string
    catalog_visibility: string
    on_sale: boolean
    virtual: boolean
    downloadable: boolean
    manage_stock: boolean
    backorders: string
    backorders_allowed: boolean
    backordered: boolean
    sold_individually: boolean
    weight: string
    shipping_taxable: boolean
    shipping_class: string
    shipping_class_id: number
    reviews_allowed: boolean
    rating_count: number
    price_html: string
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
