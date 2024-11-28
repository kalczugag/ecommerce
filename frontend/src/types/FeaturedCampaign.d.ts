import type { Category } from "./Category";
import type { Product } from "./Product";

export interface FeaturedCampaign {
    name: string;
    description?: string;
    category: string | Category;
    startDate: Date;
    endDate: Date;
    image?: string;
    products: Product[];
    status: "active" | "inactive";
}