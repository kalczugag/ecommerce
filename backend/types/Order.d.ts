import type { Product } from "./Product";
import type { User } from "./User";
import type { Payment } from "./Payment";
import type { ParsedQs } from "qs";
import type { CartItem } from "./Cart";
import type { DeliveryMethod } from "./DeliveryMethod";
import type { Document } from "mongoose";

interface OrderNote {
    text: string;
    private: boolean;
    belongsTo: {
        _entity: any;
        model: any;
    };
    createdAt?: Date;
    updatedAt?: Date;
}

interface Item {
    _id?: string;
    _order?: string | Order;
    _product: string | Product;
    name?: string;
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
    _user: string | User;
    paymentMethod: string;
    paymentStatus: "unpaid" | "pending" | "completed" | "failed" | "refunded";
    card?: {
        checks: {
            cvc_check: "pass" | "fail" | "unavailable" | "unchecked";
            address_line1_check: "pass" | "fail" | "unavailable" | "unchecked";
            address_postal_code_check:
                | "pass"
                | "fail"
                | "unavailable"
                | "unchecked";
        };
        brand: string;
        last4: string;
        exp_month: number;
        exp_year: number;
        funding: string;
        country: string;
    };
    amount: number;
    transactionId?: string;
    paymentDate?: Date;
    notes?: string[] | OrderNote[];
    authorized?: boolean;
    voided?: boolean;
    capturedAmount?: number;
    authorizationStatus?: "open" | "closed";
    allowAdditionalCapture?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Shipment extends Document {
    _id: string;
    _order: string | Order;
    items: string[] | Item[];
    shipFrom: ShippingAddress;
    shipTo: ShippingAddress;
    status:
        | "pending"
        | "shipped"
        | "delivered"
        | "returned"
        | "failed"
        | "canceled";
    _deliveryMethod: string | DeliveryMethod;
    itemsDelivered: number;
    actualDeliveryDate?: Date;
    trackingNumber?: string;
    shippingCost: number;
    deliverySignature?: boolean;
    _parentShipment?: string | Shipment; // If shipment was split
    splitShipments?: string[] | Shipment[]; // IDs of split child shipments
    notes?: string[] | OrderNote[];
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
    payments: string[] | Payment[];
    shipments: string[] | Shipment[];
    _parentOrder?: string | Order; // If order was split from another order
    splitOrders?: string[] | Order[]; // IDs of split child orders
    notes?: string[] | OrderNote[];
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
    refundPayments?: string[] | Payment[];
    notes?: string[] | OrderNote[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface UpdateOrder extends Omit<Order, "_user" | "shipments"> {
    _user?: string;
    shipment: string;
    paymentMethod: Order[];
    paymentStatus: Payment["paymentStatus"];
    deliveryMethod: DeliveryMethod;
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
    OrderNote,
    ReturnOrder,
    UpdateOrder,
    PaginatedOrders,
};
