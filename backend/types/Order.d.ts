import type { Product } from "./Product";
import { User } from "./User";
import { ParsedQs } from "qs";

export interface Item {
    product?: string | Product;
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
    subTotal: number;
    discount: number;
    deliveryCost: number;
    total: number;
    paymentMethod: "cash" | "stripe" | "paypal";
    paymentStatus?:
        | "unpaid"
        | "paid"
        | "failed"
        | "refunded"
        | "completed"
        | "canceled";
    deliveryMethod: "pickup" | "delivery";
    deliveryCost: number;
    additionalInfo?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedOrders extends ParsedQs {
    page: number;
    pageSize: number;
}
