export type CategoryLevel = "topLevel" | "secondLevel" | "thirdLevel";

export interface Category {
    _id?: string;
    name: string;
    description?: string;
    parentCategory?: any; // TODO: fix this
    level: CategoryLevel;
}

export interface GroupedCategories {
    topLevelCategories: Category[];
    secondLevelCategories: Category[];
    thirdLevelCategories: Category[];
}
