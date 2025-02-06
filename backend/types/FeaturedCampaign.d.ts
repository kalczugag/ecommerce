import type { Category } from "./Category";
import type { Product } from "./Product";

export interface FeaturedCampaign {
    name: string;
    description?: string;
    _category: string | Category;
    imageUrl?: string;
    startDate: Date;
    endDate: Date;
    image?: string;
    promoCode?: string;
    products: string[] | Product[];
    status: "active" | "inactive";
    textColor: {
        primary: string;
        secondary: string;
    };
    bgColor: {
        primary: string;
        secondary: string;
    };
}
