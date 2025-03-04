import type { Category } from "./Category";
import type { Product } from "./Product";

interface Event {
    _id?: string;
    eventType: string;
    _session: string;
    _user?: string;
    _product?: string;
    _category?: string;
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
