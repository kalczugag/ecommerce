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
    sessions: {
        direct: number;
        referral: number;
        organic: number;
    };
    eventCount: number;
    orders: number;
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
    quantity: number; // Total quantity sold
}

interface SummaryByCountry {
    _id?: string;
    country: string;
    flag: string;
    count: number;
}

interface DailySummaryQueryParams {
    date?: Date;
    today?: boolean;
    last30Days?: boolean;
    last6Months?: boolean;
    prev30Days?: boolean;
    prev6Months?: boolean;
}

export {
    Event,
    DailySummary,
    ProductDailySummary,
    SummaryByCountry,
    DailySummaryQueryParams,
};
