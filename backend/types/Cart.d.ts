import { Document } from "mongoose";
import type { Product } from "./Product";
import type { User } from "./User";
import type { Item } from "./Order";

export interface Cart {
    _id?: string;
    _user: string | User;
    items: string | Item[];
    subTotal: number;
    discount: number;
    deliveryCost: number;
    total: number;
}

export type CartDocument = Document & Cart;
