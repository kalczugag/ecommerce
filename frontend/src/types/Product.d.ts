import type { Sizes } from "@/modules/ProductsModule/ReadProductDetailsModule";

export interface Product {
    _id?: string;
    imageUrl: string[];
    brand: string;
    title: string;
    color: string;
    sku: string;
    discountedPrice?: number;
    price: number;
    discountPercent?: number;
    size: {
        name: Sizes;
        quantity: number;
    }[];
    quantity: number;
    isFavorite?: boolean;
    analytics: {
        average: number;
        reviewCount: number;
        recentReviews?: Review[] | string[];
    };
    topLevelCategory: string;
    secondLevelCategory: string;
    thirdLevelCategory: string;
    description?: string;
}

export interface ProductFilters {
    colorsCount: {
        color: string;
        count: number;
    }[];
    availableSizes: string[];
    maxPrice: number;
}
