import type { Product } from "./Product";
import type { User } from "./User";
import type { Payment } from "./Payment";
import type { ParsedQs } from "qs";
import type { CartItem } from "./Cart";
import type { DeliveryMethod } from "./DeliveryMethod";
import type { Document } from "mongoose";

interface Item {
    _id?: string;
    _order?: string | Order;
    _product: string | Product;
    name?: string;
    sku?: string;
    color?: string;
    size?: string;
    unitPrice: number;
    quantity: number;
    total?: number;
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

interface Shipment extends Document {
    _id: string;
    _order: string | Order;
    shipFrom: ShippingAddress;
    shipTo: ShippingAddress;
    status: "pending" | "shipped" | "delivered";
    _deliveryMethod: string | DeliveryMethod;
    itemsDelivered: number;
    actualDeliveryDate?: Date;
    trackingNumber?: string;
    shippingCost: number;
    deliverySignature?: boolean;
    deliveryNotes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Order {
    _id?: string;
    _user: string | User;
    items: string[] | Item[];
    status?:
        | "placed"
        | "confirmed"
        | "shipped"
        | "delivered"
        | "canceled"
        | "pending payment"
        | "returned";
    shippingAddress: ShippingAddress;
    billingAddress: ShippingAddress;
    subTotal: number;
    tax: number;
    discount: number;
    total: number;
    _payment?: string | Payment;
    _shipment: string[] | Shipment[];
    createdAt: Date;
    updatedAt: Date;
}

interface ReturnOrder {
    _id?: string;
    _order: Order;
    _user?: User;
    returnedItems: Item[];
    returnReason: string;
    returnStatus: "initiated" | "approved" | "rejected" | "completed";
    refundAmount: number;
    refundMethod: "credit_card" | "paypal" | "bank_transfer";
    _deliveryMethod?: DeliveryMethod;
    createdAt?: Date;
    updatedAt?: Date;
}

interface UpdateOrder {
    _id?: string;
    _user?: string;
    status: Order["status"];
    paymentMethod: Order["paymentMethod"];
    paymentStatus: Order["paymentStatus"];
    deliveryMethod: Order["deliveryMethod"];
    additionalInfo: Order["additionalInfo"];
}

interface PaginatedOrders extends ParsedQs {
    skip: number;
    limit: number;
}

export {
    Item,
    ShippingAddress,
    Payment,
    Shipment,
    Order,
    ReturnOrder,
    UpdateOrder,
    PaginatedOrders,
};
