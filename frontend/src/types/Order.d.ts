import type { User } from "./User";
import type { Product } from "./Product";

interface Item {
    product?: string | Product;
    color: string;
    size: Sizes;
    unitPrice: number;
    quantity: number;
}

export interface Order {
    _id?: string;
    _user?: User;
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
    paymentMethod?: "cash" | "stripe" | "paypal";
    paymentStatus?:
        | "unpaid"
        | "paid"
        | "failed"
        | "refunded"
        | "completed"
        | "canceled";
    deliveryMethod?: "pickup" | "delivery";
    deliveryCost: number;
    additionalInfo?: string;
    trackingNumber?: string;
    new: boolean;
    leftOn?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UpdateOrder {
    _id?: string;
    status?: Order["status"];
    paymentMethod?: Order["paymentMethod"];
    paymentStatus?: Order["paymentStatus"];
    deliveryMethod?: Order["deliveryMethod"];
    additionalInfo?: Order["additionalInfo"];
}
