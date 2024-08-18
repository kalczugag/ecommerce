import type { Product } from "./Product";

export interface Order {
    _id?: string;
    _user: string;
    items: Product["_id"][];
    status: string;
    total: number;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}
