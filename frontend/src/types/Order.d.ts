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
    paymentMethod: string;
    paymentStatus: "unpaid" | "pending" | "completed" | "failed" | "refunded";
    amount: number;
    transactionId?: string;
    paymentDate?: Date;
    paymentNotes?: OrderNote[];
    authorized?: boolean;
    voided?: boolean;
    capturedAmount?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Shipment {
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
    _deliveryMethod: DeliveryMethod | string;
    itemsDelivered: number;
    actualDeliveryDate?: Date;
    trackingNumber?: string;
    shippingCost?: number;
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
    discount?: number;
    total: number;
    payments?: Payment[];
    shipments: Shipment[];
    _parentOrder?: Order;
    splitOrders?: Order[];
    orderNotes?: OrderNote[];
    createdAt?: Date;
    updatedAt?: Date;
}

interface AddOrder
    extends Omit<
        Order,
        "_user" | "shippingAddress" | "billingAddress" | "tax" | "shipments"
    > {
    items: string[];
}

interface UpdateOrder {
    _id: string;
    status?: Order["status"];
    shippingAddress?: Order["shippingAddress"];
    billingAddress?: Order["billingAddress"];
    shipments?: Array<
        Omit<Shipment, "_deliveryMethod" | "status"> & {
            _deliveryMethod?: string;
        }
    >;
}

export {
    Item,
    Shipment,
    ShippingAddress,
    Payment,
    Order,
    OrderNote,
    AddOrder,
    UpdateOrder,
};
