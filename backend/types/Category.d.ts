export interface Category {
    name: string;
    description?: string;
    parentCategory?: string | Category;
    level: "topLevel" | "secondLevel" | "thirdLevel";
}

export interface PaginatedCategories {
    level?: string;
    page: number;
    pageSize: number;
}
