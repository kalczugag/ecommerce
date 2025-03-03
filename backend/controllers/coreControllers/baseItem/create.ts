import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { BaseItemModel } from "../../../models/BaseItem";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { OrderModel } from "../../../models/Order";
import { ProductModel } from "../../../models/Product";
import type { Item } from "../../../types/Order";

export const createBaseItem = async (
    req: express.Request<
        {},
        {},
        Item & { orderId: string; shipmentId: string }
    >,
    res: express.Response
) => {
    const { orderId, shipmentId, ...updates } = req.body;

    const { error } = schema.validate(updates);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    if (!orderId) {
        return res
            .status(400)
            .json(errorResponse(null, "No order ID provided", 400));
    }

    try {
        const newBaseItem = new BaseItemModel(updates);
        await newBaseItem.save();

        if (!newBaseItem) {
            return res
                .status(404)
                .json(errorResponse(null, "Cannot create an item", 404));
        }

        if (newBaseItem._product) {
            await ProductModel.updateOne(
                { _id: newBaseItem._product, "size.name": newBaseItem.size },
                {
                    $inc: {
                        "size.$.quantity": -newBaseItem.quantity,
                        quantity: -newBaseItem.quantity,
                    },
                }
            ).exec();
        }

        if (shipmentId) {
            await ShipmentModel.findOneAndUpdate(
                { _id: shipmentId },
                { $push: { items: newBaseItem } },
                { new: true }
            );
        }

        await OrderModel.findOneAndUpdate(
            { _id: orderId },
            { $push: { items: newBaseItem } },
            { new: true }
        );

        return res
            .status(201)
            .json(
                successResponse(newBaseItem, "Item created successfully", 201)
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
