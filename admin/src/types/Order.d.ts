import type { User } from "./User";
import type { Product } from "./Product";
import type { DeliveryMethod } from "./DeliveryMethod";

interface OrderNote {
    text: string;
    private: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Item {
    _id?: string;
    _order?: string | Order;
    _product: Product;
    name: string;
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
    transactionId?: string;
    paymentDate?: Date;
    paymentNotes?: OrderNote[];
    authorized?: boolean;
    voided?: boolean;
    capturedAmount?: number;
    authorizationStatus?: "open" | "closed";
    allowAdditionalCapture?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Shipment {
    _id?: string;
    _order: string | Order;
    shipFrom: ShippingAddress;
    shipTo: ShippingAddress;
    status:
        | "pending"
        | "shipped"
        | "delivered"
        | "returned"
        | "failed"
        | "canceled";
    _deliveryMethod: DeliveryMethod;
    itemsDelivered: number;
    actualDeliveryDate?: Date;
    trackingNumber?: string;
    shippingCost: number;
    deliverySignature?: boolean;
    _parentShipment?: Shipment;
    splitShipments?: Shipment[];
    deliveryNotes?: OrderNote[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface Order {
    _id?: string;
    _user: User;
    items: Item[];
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
    payments?: Payment[];
    shipments: Shipment[];
    _parentOrder?: Order;
    splitOrders?: Order[];
    orderNotes?: OrderNote[];
    createdAt: Date;
    updatedAt: Date;
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
    _deliveryMethod: DeliveryMethod;
    refundPayments?: Payment[];
    refundNotes?: OrderNote[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface UpdateOrder {
    _id: string;
    status?: Order["status"];
}

interface AddItem extends Omit<Item, "_product"> {
    orderId: string;
    _product?: string;
}

export {
    Item,
    ShippingAddress,
    Shipment,
    Payment,
    Order,
    OrderNote,
    ReturnOrder,
    UpdateOrder,
    AddItem,
};
