import type { Product } from "./Product";
import type { Item } from "./Order";
import type { User } from "./User";

export interface Cart {
    _id?: string;
    _user: string | User;
    _products: Item[];
    subTotal: number;
    discount: number;
    deliveryCost: number;
    total: number;
}
