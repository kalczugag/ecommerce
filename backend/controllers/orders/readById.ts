import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import { DeliveryMethodModel } from "../../models/DeliveryMethod";
import { Shipment } from "../../types/Order";

export const getOrderById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Order ID is required" });
    }

    try {
        const order = await OrderModel.findById(id)
            .populate("_user", "firstName lastName email phone address")
            .populate("payments")
            .populate({
                path: "shipments",
            })
            .populate({
                path: "items",
                populate: {
                    path: "_product",
                    model: "Product",
                },
            })
            .exec();

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        const enhancedShipments = await enhanceShipments(order.shipments);

        const enhancedOrder = {
            ...order.toObject(),
            shipments: enhancedShipments,
        };

        return res.status(200).json(enhancedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const enhanceShipments = async (
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
