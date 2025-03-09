import type { Category } from "./Category";
import type { Product } from "./Product";

interface Event {
    _id?: string;
    eventType: string;
    _session: string;
    _user?: string | User;
    _product?: string | Product;
    _category?: string | Category;
    metadata?: any;
    timestamp: Date;
}

interface DailySummary {
    _id?: string;
    date: Date;
    pageViews: number;
    sessions: number;
    orders: number;
    sales: number;
    earnings: number;
    uniqueUsers: number;
}

interface ProductDailySummary {
    _id?: string;
    date: Date;
    _product: string | Product;
    views: number;
    orders: number;
    sales: number; // Total revenue from product
}

export { Event, DailySummary, ProductDailySummary };
