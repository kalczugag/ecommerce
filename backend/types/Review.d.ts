import type { Product } from "./Product";
import type { User } from "./User";

export interface Review {
    _id?: string;
    _product: Product;
    _user: User;
    value: number;
    reviewMessage: string;
}
