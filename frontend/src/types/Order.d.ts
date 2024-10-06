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
    items: Item[];
    status?:
        | "placed"
        | "confirmed"
        | "shipped"
        | "in_delivery"
        | "delivered"
        | "cancelled";
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
