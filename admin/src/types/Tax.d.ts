import type { Category } from "./Category";

export interface Tax {
    region: string;
    category: Category;
    taxPercent: number;
}
