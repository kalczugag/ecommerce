import type { Category } from "./Category";
import type { Product } from "./Product";

export interface FeaturedCampaign {
    name: string;
    description?: string;
    _category: Category;
    startDate: Date;
    endDate: Date;
    image?: string;
    products: Product[];
    status: "active" | "inactive";
    colors: {
        primary: string;
        secondary: string;
    };
}
