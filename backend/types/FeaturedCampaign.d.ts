import type { Category } from "./Category";
import type { Product } from "./Product";
import type { ParsedQs } from "qs";

export interface FeaturedCampaign {
    _id?: string;
    name: string;
    description?: string;
    _category: string | Category;
    imageUrl?: string;
    startDate: Date;
    endDate: Date;
    image?: string;
    discount: number; // %
    // minPrice?:number;
    // maxPrice?:number;
    promoCode?: string;
    products: string[] | Product[];
    status: "active" | "inactive" | "scheduled" | "completed";
    textColor: {
        primary: string;
        secondary: string;
    };
    bgColor: {
        primary: string;
        secondary: string;
    };
    hidden?: boolean;
}

export interface PaginatedCampaigns extends ParsedQs {
    search?: { search: string };
    sort?: string;
    category?: string;
    page: number;
    pageSize: number;
}
