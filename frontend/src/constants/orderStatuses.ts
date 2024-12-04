import type { Order } from "@/types/Order";

export const orderStatuses: Record<NonNullable<Order["status"]>, string> = {
    placed: "Placed",
    confirmed: "Confirmed",
    shipped: "Shipped",
    in_delivery: "In Delivery",
    delivered: "Delivered",
    canceled: "Canceled",
};
