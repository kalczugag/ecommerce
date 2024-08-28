export interface Category {
    name: string;
    description: string;
    parentCategory?: string;
    level: "topLevel" | "secondLevel" | "thirdLevel";
}
