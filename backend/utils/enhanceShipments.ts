import { DeliveryMethodModel } from "../models/DeliveryMethod";
import type { Shipment } from "../types/Order";

export const enhanceShipments = async (
    shipments: any[] | undefined
): Promise<any[]> => {
    if (!shipments || shipments.length === 0) return [];

    const firstShipment = shipments[0] as Shipment;
    const deliveryMethod = await DeliveryMethodModel.findOne(
        { "providers._id": firstShipment._deliveryMethod },
        { _id: 1, type: 1, metadata: 1, "providers.$": 1 }
    );

    return shipments.map((shipment) =>
        typeof shipment === "object"
            ? { ...shipment.toObject(), _deliveryMethod: deliveryMethod }
            : shipment
    );
};
