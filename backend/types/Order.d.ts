import { User } from "./User";

export interface Item {
    product?: string;
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
}

export interface Order {
    _id?: string;
    _user: User;
    items: itemSchema[];
    status?:
        | "placed"
        | "confirmed"
        | "shipped"
        | "in_delivery"
        | "delivered"
        | "cancelled";
    total: number;
    paymentMethod: string;
    paymentStatus?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedOrders {
    page: number;
    pageSize: number;
}
