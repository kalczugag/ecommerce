import { Category } from "./Category";

export interface Product {
    _id?: string;
    sku: string;
    imageUrl: string[] | string;
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
    quantity?: number;
    analytics: {
        average: number;
        reviewCount: number;
        recentReviews?: Review[] | string[];
    };
    featuredCampaigns?: any;
    topLevelCategory: Category;
    secondLevelCategory: Category;
    thirdLevelCategory: Category;
    description?: string;
}
