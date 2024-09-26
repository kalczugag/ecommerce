import { User } from "./User";
import { ParsedQs } from "qs";

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
    items: Item[];
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
    deliveryMethod: string;
    deliveryCost: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedOrders extends ParsedQs {
    page: number;
    pageSize: number;
}
