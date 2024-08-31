export type CategoryLevel = "topLevel" | "secondLevel" | "thirdLevel";

export interface Category {
    _id?: string;
    name: string;
    description?: string;
    parentCategory?: any; // TODO: fix this
    level: CategoryLevel;
}
