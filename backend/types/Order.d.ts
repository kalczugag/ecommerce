import type { Product } from "./Product";
import type { User } from "./User";
import type { Payment } from "./Payment";
import type { ParsedQs } from "qs";

interface Item {
    _id?: string;
    orderId: string | Order;
    productId: string | Product;
    name: string;
    sku: string;
    color?: string;
    size?: string;
    unitPrice: number;
    quantity: number;
    total: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

interface Payment {
    _id?: string;
    orderId: string | Order;
    paymentMethod: string;
    paymentStatus: "pending" | "completed" | "failed" | "refunded";
    amount: number;
    transactionId?: string;
    paymentDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Order {
    _id?: string;
    userId: User;
    items: Item[];
    status?: "placed" | "confirmed" | "shipped" | "delivered" | "canceled";
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    subTotal: number;
    tax: number;
    discount: number;
    deliveryCost: number;
    total: number;
    payment: Payment;
    trackingNumber?: string;
    shippingMethod: "standard" | "express" | "same-day";
    deliveryMethod: "pickup" | "delivery";
    createdAt: Date;
    updatedAt: Date;
}

interface ReturnOrder {
    _id?: string;
    orderId: string | Order;
    userId: string | User;
    returnedItems: string | Item[];
    returnReason: string;
    returnStatus: "initiated" | "approved" | "rejected" | "completed";
    refundAmount: number;
    refundMethod: "credit_card" | "paypal" | "bank_transfer";
    returnDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UpdateOrder {
    _id?: string;
    _user?: string;
    status: Order["status"];
    paymentMethod: Order["paymentMethod"];
    paymentStatus: Order["paymentStatus"];
    deliveryMethod: Order["deliveryMethod"];
    additionalInfo: Order["additionalInfo"];
}

export interface PaginatedOrders extends ParsedQs {
    skip: number;
    limit: number;
}
