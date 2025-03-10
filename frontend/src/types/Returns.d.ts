import type { Item, Payment, OrderNote, Order } from "./Order";
import type { DeliveryMethod } from "./DeliveryMethod";
import type { User } from "./User";

export interface ReturnOrder {
    _id?: string;
    _order: Order | string;
    _user?: User | string;
    returnedItems: Item[] | string[];
    returnReason: string;
    returnStatus?: "initiated" | "approved" | "rejected" | "completed";
    refundAmount?: number;
    refundMethod: "credit_card" | "paypal" | "bank_transfer";
    _deliveryMethod?: DeliveryMethod;
    refundPayments?: Payment[];
    refundNotes?: OrderNote[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateReturnOrder {
    _order: string;
    returnedItems: string[];
    returnReason: string;
    refundAmount?: number;
    refundMethod?: "credit_card" | "paypal" | "bank_transfer";
    _deliveryMethod?: DeliveryMethod;
}
