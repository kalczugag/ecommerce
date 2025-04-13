import type { Product } from "./Product";
import type { User } from "./User";

export interface Wishlist {
    _id?: string;
    _user: string | User;
    products?: string[] | Product[];
}
