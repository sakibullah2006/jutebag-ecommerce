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
        position: number,
        visible: boolean,
        variation: boolean,
        options: string[]
    }[]
    default_attributes: {
        id: number,
        name: string,
        option: string
    }[]
    selectedAttributes?: {
        Color?: string
        Size?: string
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
    name: string
    stock_status: string
    stock_quantity: number | null
    price: string
    regular_price: string
    sale_price: string
    image: { src: string, alt: string, name: string }
    attributes: {
        id: number,
        slug: string,
        name: string,
        option: string
    }[]
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
    line_items: {
      product_id: number;
      quantity: number;
      size?: string;
      variation_id: number;
    }[];
    customer_id: number; 
  }

export interface Customer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
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
    shipping: {
        first_name: string;
        last_name: string;
        address_1: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
    };
}


