import type { ParsedQs } from "qs";

export interface Category {
    _id?: string;
    name: string;
    description?: string;
    _parentCategory?: string | Category;
    level: "topLevel" | "secondLevel" | "thirdLevel";
    hidden?: boolean;
}

export interface SortedCategories {
    topLevelCategories: Category[];
    secondLevelCategories: Category[];
    thirdLevelCategories: Category[];
}

export interface PaginatedCategories extends ParsedQs {
    category?: string;
    sorted?: boolean;
    page: number;
    pageSize: number;
}
