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
    featuredCampaigns?: any;
    salesCount?: number;
    topLevelCategory: Category;
    secondLevelCategory: Category;
    thirdLevelCategory: Category;
    description?: string;
}
