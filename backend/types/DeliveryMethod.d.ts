export interface Provider {
    name: string;
    price: number;
    estimatedDeliveryTime?: string;
    additionalNotes?: any;
    isAvailable?: boolean;
}

export interface DeliveryMethod {
    type: "home_delivery" | "locker_delivery" | "pickup";
    providers: Provider[];
    metadata?: any;
}
