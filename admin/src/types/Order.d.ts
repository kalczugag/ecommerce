import { User } from "./User";
import { Product } from "./Product";

export interface Item {
    product?: {
        _id?: string;
        imageUrl: string;
        brand: string;
        title: string;
    };
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
}

export interface Order {
    _id?: string;
    _user: User;
    items: Item[];
    status:
        | "placed"
        | "confirmed"
        | "shipped"
        | "in_delivery"
        | "delivered"
        | "cancelled";
    total: number;
    trackingNumber?: string;
    isPending: boolean;
    leftOn?: string;
    paymentMethod: string;
    paymentStatus?: string;
}
