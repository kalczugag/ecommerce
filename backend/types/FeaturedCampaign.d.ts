import type { Category } from "./Category";
import type { Product } from "./Product";

export interface FeaturedCampaign {
    name: string;
    description?: string;
    _category: string | Category;
    startDate: Date;
    endDate: Date;
    image?: string;
    products: string[] | Product[];
    status: "active" | "inactive";
}
