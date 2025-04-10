import type { ParsedQs } from "qs";
import type { Category } from "./Category";
import type { FeaturedCampaign } from "./FeaturedCampaign";
import type { Review } from "./Review";

export interface Product {
    _id?: string;
    sku: string;
    imageUrl: string[];
    brand: string;
    title: string;
    color: string;
    discountedPrice?: number;
    price: number;
    discountPercent?: number;
    size: {
        name: string;
        quantity: number;
    }[];
    quantity: number;
    analytics: {
        average: number;
        reviewCount: number;
        byStars: {
            1: number;
            2: number;
            3: number;
            4: number;
            5: number;
        };
    };
    featuredCampaigns: string[] | FeaturedCampaign[];
    topLevelCategory: string | Category;
    secondLevelCategory: string | Category;
    thirdLevelCategory: string | Category;
    description?: string;
}

export interface PaginatedProducts extends ParsedQs {
    random?: boolean;
    search?: { search: string };
    sort?: string;
    category?: string;
    favorite?: boolean;
    page: number;
    pageSize: number;
}
