import type { Product } from "./Product";
import type { User } from "./User";

export interface Item {
    product?: Product;
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
}

export interface Cart {
    _id?: string;
    _user: string | User;
    _products: Item[];
    subTotal: number;
    discount: number;
    deliveryCost: number;
    total: number;
}
