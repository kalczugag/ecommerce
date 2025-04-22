import express from "express";
import mongoose from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { CartModel } from "../../../models/Cart";
import { OrderModel } from "../../../models/Order";
import { NoteModel } from "../../../models/Order/Notes";
import { ShipmentModel } from "../../../models/Order/Shipment";
import { DeliveryMethodModel } from "../../../models/DeliveryMethod";
import type { CreateOrder } from "../../../types/Order";

export const createOrder = async (
    req: express.Request<{}, {}, CreateOrder>,
    res: express.Response
) => {
    const { orderData, shipmentData } = req.body;
    const session = await mongoose.startSession();

    const { error } = schema.validate(req.body);

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

    try {
        session.startTransaction();

        const deliveryMethod = await DeliveryMethodModel.findOne(
            { "providers._id": shipmentData._deliveryMethod },
            { _id: 1, type: 1, metadata: 1, "providers.$": 1 }
        ).session(session);

        if (!deliveryMethod) {
            return res
                .status(404)
                .json(errorResponse(null, "Delivery method not found", 404));
        }

        const deliveryProvider = deliveryMethod.providers[0];

        const cart = await CartModel.findOne({
            _id: orderData._cart,
            _user: orderData._user,
        }).session(session);

        if (!cart) {
            return res
                .status(404)
                .json(
                    errorResponse(
                        null,
                        "Cart not found or does not belong to user",
                        404
                    )
                );
        }

        const finalTotal = cart.total + deliveryProvider.price;

        const orderNotes = orderData.notes || [];
        const shipmentNotes = shipmentData.notes || [];

        let orderNotesIds;
        if (orderNotes.length > 0) {
            const notes = await NoteModel.insertMany(orderNotes, { session });
            orderNotesIds = notes.map((note) => note._id);
        }

        let shipmentNotesIds;
        if (shipmentNotes.length > 0) {
            const notes = await NoteModel.insertMany(shipmentNotes, {
                session,
            });
            shipmentNotesIds = notes.map((note) => note._id);
        }

        const newOrder = new OrderModel({
            _user: orderData._user,
            items: cart.items,
            subTotal: cart.subTotal,
            discount: cart.discount,
            total: finalTotal,
            shippingAddress: orderData.shippingAddress,
            billingAddress: orderData.billingAddress,
            notes: orderNotesIds,
        });

        await newOrder.save({ session });

        const newShipment = new ShipmentModel({
            _order: newOrder._id,
            items: cart.items,
            shipFrom: shipmentData.shipFrom,
            shipTo: shipmentData.shipTo,
            _deliveryMethod: deliveryProvider._id,
            shippingCost: deliveryProvider.price,
            notes: shipmentNotesIds,
        });

        await newShipment.save({ session });

        newOrder.shipments = [newShipment._id];
        await newOrder.save({ session });

        await session.commitTransaction();

        return res
            .status(201)
            .json(successResponse(newOrder, "Order created successfully", 201));
    } catch (error) {
        await session.abortTransaction();
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
