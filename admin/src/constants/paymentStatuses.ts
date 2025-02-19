import type { Payment } from "@/types/Order";

export const paymentStatuses: Record<
    NonNullable<Payment["paymentStatus"]>,
    string
> = {
    unpaid: "Unpaid",
    pending: "Pending",
    completed: "Completed",
    failed: "Failed",
    refunded: "Refunded",
};
