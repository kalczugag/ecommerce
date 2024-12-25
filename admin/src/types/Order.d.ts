import type { User } from "./User";
import type { Product } from "./Product";
import type { DeliveryMethod } from "./DeliveryMethod";

interface Item {
    _id?: string;
    _order?: string | Order;
    _product: Product;
    name: string;
    sku?: string;
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
    _order: string | Order;
    paymentMethod: string;
    paymentStatus: "unpaid" | "pending" | "completed" | "failed" | "refunded";
    amount: number;
    transactionId?: string;
    paymentDate?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Order {
    _id?: string;
    _user: User;
    items: Item[];
    status?: "placed" | "confirmed" | "shipped" | "delivered" | "canceled";
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    subTotal: number;
    tax: number;
    discount: number;
    deliveryCost: number;
    total: number;
    _payment?: Payment;
    trackingNumber?: string;
    _deliveryMethod: DeliveryMethod;
    createdAt?: Date;
    updatedAt?: Date;
}

interface ReturnOrder {
    _id?: string;
    _order: Order;
    _user: User;
    returnedItems: Item[];
    returnReason: string;
    returnStatus: "initiated" | "approved" | "rejected" | "completed";
    refundAmount: number;
    refundMethod: "credit_card" | "paypal" | "bank_transfer";
    returnDate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}

export { Item, ShippingAddress, Payment, Order, ReturnOrder };
