import type { Order } from "@/types/Order";

export const orderStatuses: Record<NonNullable<Order["status"]>, string> = {
    placed: "Placed",
    confirmed: "Confirmed",
    shipped: "Shipped",
    delivered: "Delivered",
    "pending payment": "Pending Payment",
    canceled: "Canceled",
    returned: "Returned",
};
