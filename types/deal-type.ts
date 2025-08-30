export interface Deal {
    title: string;
    slug: string;
    dealDescription: string;
    markdownDetails: string;
    offerText: string;
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
    expiry_date: string;
    redirect_link: string;
    landing_section: boolean;
}