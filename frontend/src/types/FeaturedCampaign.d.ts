import type { Category } from "./Category";
import type { Product } from "./Product";

export interface FeaturedCampaign {
    _id?: string;
    name: string;
    description?: string;
    _category: string | Category;
    startDate: Date;
    endDate: Date;
    promoCode?: string;
    hidden: boolean;
    image?: string;
    products: Product[];
    status: "active" | "inactive";
    textColor: {
        primary: string;
        secondary: string;
    };
    bgColor: {
        primary: string;
        secondary: string;
    };
    numOfCoupons: number;
}
