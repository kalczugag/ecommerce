import { Shipment } from "types/Order";

export const processShipments = (shipments: Shipment[]) => {
    if (!Array.isArray(shipments)) {
        throw new Error("Invalid shipments data: Expected an array.");
    }

    const shipmentCount = shipments.length;
    const shipmentTotal = shipments.reduce(
        (acc, shipment) => acc + (shipment.shippingCost || 0),
        0
    );

    if (shipmentCount === 1) {
        return {
            shipment: shipments[0],
            shipmentTotal,
            shipmentCount,
        };
    }

    return {
        shipments,
        shipmentTotal,
        shipmentCount,
    };
};
