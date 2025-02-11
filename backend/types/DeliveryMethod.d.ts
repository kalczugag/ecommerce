export interface Provider {
    _id?: string;
    name: string;
    price: number;
    estimatedDeliveryTimeMin: number;
    estimatedDeliveryTimeMax: number;
    trackingUrl?: string;
    additionalNotes?: string;
    isAvailable?: boolean;
}

export interface DeliveryMethod {
    _id?: string;
    type: "home_delivery" | "locker_delivery" | "pickup";
    providers: Provider[];
    metadata?: any;
}
