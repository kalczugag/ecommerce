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
    colors: {
        count: number;
        color: string;
    }[];
    sizes: {
        categoryName: string;
        sizes: {
            name: string;
            count: number;
        }[];
    }[];
    priceRange: {
        min: number;
        max: number;
    };
    brands: {
        count: number;
        brand: string;
    }[];
    discounts: {
        count: number;
        hasDiscount: boolean;
    }[];
    availability: {
        count: number;
        inStock: boolean;
    }[];
}
