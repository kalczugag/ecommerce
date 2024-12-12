import type { ParsedQs } from "qs";
import type { Category } from "./Category";

export interface Tax {
    region: string;
    category: string | Category;
    taxPercent: number;
}

export interface PaginatedTaxes extends ParsedQs {
    page: number;
    pageSize: number;
}
