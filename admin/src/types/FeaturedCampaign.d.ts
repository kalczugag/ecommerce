import type { Category } from "./Category";
import type { Product } from "./Product";

interface FeaturedCampaign {
    name: string;
    description?: string;
    _category: Category;
    startDate: Date;
    endDate: Date;
    promoCode?: string;
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
}

interface CampaignsGlobalSummary {
    _id: string;
    views: number;
    total: number;
    active: number;
    inactive: number;
    scheduled: number;
    completed: number;
    createdAt: Date;
    updatedAt: Date;
}

export { FeaturedCampaign, CampaignsGlobalSummary };
