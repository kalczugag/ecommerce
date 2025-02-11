import type { DeliveryMethod } from "@/types/DeliveryMethod";

export const deliveryMethods: Record<
    NonNullable<DeliveryMethod["type"]>,
    string
> = {
    home_delivery: "Home Delivery",
    locker_delivery: "Locker Delivery",
    pickup: "Pickup",
    unavailable_for_customers: "Unavailable for Customers",
};
