import { ParsedQs } from "qs";
import { Category } from "./Category";

export interface Product {
    _id?: string;
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
    featured: boolean;
    salesCount: number;
    topLevelCategory: string | Category;
    secondLevelCategory: string | Category;
    thirdLevelCategory: string | Category;
    description?: string;
}

export interface PaginatedProducts extends ParsedQs {
    random?: boolean;
    category?: string;
    page: number;
    pageSize: number;
}
