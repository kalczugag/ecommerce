import type { Sizes } from "@/modules/ProductsModule/ReadProductModule";

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
        name: Sizes;
        quantity: number;
    }[];
    quantity: number;
    topLevelCategory: string;
    secondLevelCategory: string;
    thirdLevelCategory: string;
    description?: string;
}
