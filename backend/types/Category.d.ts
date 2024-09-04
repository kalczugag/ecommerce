import { ParsedQs } from "qs";

export interface Category {
    name: string;
    description?: string;
    parentCategory?: string | Category;
    level: "topLevel" | "secondLevel" | "thirdLevel";
}

export interface PaginatedCategories extends ParsedQs {
    level?: string;
    page: number;
    pageSize: number;
}
