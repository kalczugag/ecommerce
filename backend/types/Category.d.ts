import { ParsedQs } from "qs";

export interface Category {
    name: string;
    description?: string;
    parentCategory?: string | Category;
    level: "topLevel" | "secondLevel" | "thirdLevel";
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
