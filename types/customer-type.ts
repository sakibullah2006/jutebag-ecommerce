export interface Customer {
    id: number;
    email: string;
    phone: string;
    date_created: string;
    first_name: string;
    last_name: string;
    username: string;
    avatar_url?: string;
    billing: {
        first_name: string;
        last_name: string;
        address_1: string;
        address_2?: string;
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
        address_2?: string;
        city: string;
        state: string;
        postcode: string;
        country: string;
        email?: string;
        phone?: string
    };
}

export interface DownloadData {
    download_id: string;
    download_url: string;
    product_id: number;
    product_name: string;
    download_name: string;
    order_id: number;
    order_key: string;
    downloads_remaining: string;
    access_expires: string;
    access_expires_gmt: string;
    file: {
        name: string;
        file: string;
    };

}



