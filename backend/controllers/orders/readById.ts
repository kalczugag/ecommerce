import express from "express";
import { isValidObjectId } from "mongoose";
import { OrderModel } from "../../models/Order";
import { DeliveryMethodModel } from "../../models/DeliveryMethod";
import { Shipment } from "types/Order";

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
            .populate("_payment")
            .populate({
                path: "_shipment",
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

        let enhancedShipments: any[];

        if (order._shipment && order._shipment.length > 0) {
            console.log("Order shipments:", order._shipment);

            const deliveryMethod = await DeliveryMethodModel.findOne(
                {
                    "providers._id": (order._shipment[0] as Shipment)
                        ._deliveryMethod,
                },
                { _id: 1, type: 1, metadata: 1, "providers.$": 1 }
            );

            enhancedShipments = Array.isArray(order._shipment)
                ? order._shipment.map((shipment) => {
                      if (typeof shipment === "object") {
                          return {
                              ...shipment.toObject(),
                              _deliveryMethod: deliveryMethod,
                          };
                      } else if (typeof shipment === "string") {
                          return shipment;
                      }
                      return shipment;
                  })
                : [];
        } else {
            enhancedShipments = [];
        }

        const enhancedOrder = {
            ...order.toObject(),
            _shipment: enhancedShipments,
        };

        return res.status(200).json(enhancedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
