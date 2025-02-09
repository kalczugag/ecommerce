import type { Payment, Shipment } from "@/types/Order";

export const processShipments = (shipments: Shipment[]) => {
    if (!Array.isArray(shipments)) {
        throw new Error("Invalid shipments data: Expected an array.");
    }

    const shipmentCount = shipments.length;
    const shipmentTotal = shipments.reduce(
        (acc, shipment) => acc + (shipment.shippingCost || 0),
        0
    );

    const isMoreThanOne = shipmentCount > 1;

    return {
        shipments,
        shipmentTotal,
        shipmentCount,
        isMoreThanOne,
    };
};

export const processPayments = (payments: Payment[]) => {
    if (!Array.isArray(payments)) {
        throw new Error("Invalid payments data: Expected an array.");
    }

    const paymentCount = payments.length;
    const paymentTotal = payments.reduce(
        (acc, payment) => acc + payment.amount,
        0
    );

    const isMoreThanOne = paymentCount > 1;

    return {
        payments,
        paymentTotal,
        paymentCount,
        isMoreThanOne,
    };
};
