import { Document } from "mongoose";
import type { Product } from "./Product";
import type { User } from "./User";

export interface CartItem {
    _id: string;
    _product: string | Product;
    color: string;
    size: string;
    quantity: number;
}

export interface Cart {
    _id?: string;
    _user: string | User;
    items: string | CartItem[];
    subTotal: number;
    discount: number;
    deliveryCost: number;
    total: number;
}

export type CartDocument = Document & Cart;
