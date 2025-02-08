import type { DeliveryMethod } from "@/types/DeliveryMethod";

export const deliveryMethods: Record<
    NonNullable<DeliveryMethod["type"]>,
    string
> = {
    home_delivery: "Home",
    locker_delivery: "Locker",
    pickup: "Pickup",
};
