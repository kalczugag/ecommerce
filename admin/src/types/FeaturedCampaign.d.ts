import type { Category } from "./Category";
import type { Product } from "./Product";

interface FeaturedCampaign {
    _id?: string;
    name: string;
    description?: string;
    _category: Category;
    startDate: Date;
    endDate: Date;
    promoCode?: string;
    image?: string;
    imageUrl?: string;
    minPrice?: number;
    maxPrice?: number;
    discount: number;
    products: Product[];
    status: "active" | "inactive" | "scheduled" | "completed";
    textColor: {
        primary: string;
        secondary: string;
    };
    bgColor: {
        primary: string;
        secondary: string;
    };
    hidden: boolean;
    createdAt: string;
    updatedAt: string;
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
