export type CategoryLevel = "topLevel" | "secondLevel" | "thirdLevel";

export interface Category {
    _id?: string;
    name: string;
    description?: string;
    _parentCategory?: any; // TODO: fix this
    level: CategoryLevel;
    hidden: boolean;
}

export interface GroupedCategories {
    topLevelCategories: Category[];
    secondLevelCategories: Category[];
    thirdLevelCategories: Category[];
}
