// Provider additionalNotes pattern examples
// Note: all fields are optional but must follow the pattern

// for locker_delivery type
// additionalNotes: {
//     lockerCodeRequired: true
// }

// for home_delivery type
// additionalNotes: {
//     trackingAvailable: true,
//     insured: true
//     express: true,
//     ecoFriendly: true
// }

// for pickup type
// additionalNotes: {
//     address: {
//         street: "123 Main Street",
//         city: "Springfield",
//         postalCode: "12345",
//         country: "USA"
//     },
//     pickupHours: "9:00 AM - 8:00 PM"
// }

export interface Provider {
    _id?: string;
    name: string;
    price: number;
    estimatedDeliveryTimeMin: number;
    estimatedDeliveryTimeMax: number;
    additionalNotes?: any;
    isAvailable?: boolean;
}

// Metadata pattern examples
// Important: in every case below pattern is used

// metadata: {
//     region: "USA",
//     specialInstructions: "Locker access code will be send via email."
// }

export interface DeliveryMethod {
    _id?: string;
    type:
        | "home_delivery"
        | "locker_delivery"
        | "pickup"
        | "unavailable_for_customers";
    providers: Provider[];
    metadata?: any;
}
