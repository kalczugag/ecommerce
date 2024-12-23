export interface Provider {
    _id?: string;
    name: string;
    price: number;
    estimatedDeliveryTime?: string;
    additionalNotes?: any;
    isAvailable?: boolean;
}

export interface DeliveryMethod {
    _id?: string;
    type: "home_delivery" | "locker_delivery" | "pickup";
    providers: Provider[];
    metadata?: any;
}
