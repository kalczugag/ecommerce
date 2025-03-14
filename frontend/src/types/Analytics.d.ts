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

interface DailySummary {
    _id?: string;
    date: Date;
    pageViews: number;
    sessions: {
        direct: number;
        referral: number;
        organic: number;
    };
    orders: number;
    earnings: number;
    uniqueUsers: number;
}

interface ProductDailySummary {
    _id?: string;
    date: Date;
    _product: string;
    views: number;
    orders: number;
    sales: number; // Total revenue from product
    quantity: number; // Total quantity sold
}

export { Event, DailySummary, ProductDailySummary };
