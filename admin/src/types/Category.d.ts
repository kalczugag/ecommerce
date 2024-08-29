export interface Category {
    _id?: string;
    name: string;
    description?: string;
    parentCategory?: any; // TODO: fix this
    level: "topLevel" | "secondLevel" | "thirdLevel";
}
