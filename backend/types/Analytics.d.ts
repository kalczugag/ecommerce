import type { Category } from "./Category";
import type { Product } from "./Product";

interface Event {
    _id?: string;
    type: string;
    _user: string | User;
    _session: string;
    _product?: string | Product;
    _category?: string | Category;
    metadata?: any;
    timestamp: Date;
}

interface Statistics {
    _id?: string;
    _store?: string;
    totalVisits: number;
    totalOrders: number;
    totalRevenue: number;
    converisonRate: number;
    averageOrderValue: number;
    productsStats: {
        _product: string;
        views: number;
        orders: number;
        revenue: number;
        conversionRate: number;
    }[];
    categoryStats: {
        _category: string;
        views: number;
        orders: number;
        revenue: number;
        conversionRate: number;
    }[];
}

export { Event, Statistics };
