import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { OrderModel } from "../../../models/Order";
import { NoteModel } from "../../../models/Order/Notes";
import type { Order } from "../../../types/Order";
import type { User } from "../../../types/User";

export const createOrder = async (
    req: express.Request<{}, {}, Order>,
    res: express.Response
) => {
    const user = req.user as User;

    const order = {
        ...req.body,
        _user: user._id?.toString(),
    };

    const { error } = schema.validate(order);

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
        if (order.notes && order.notes.length > 0) {
            const notes = await NoteModel.insertMany(order.notes);

            order.notes = notes.map((note) => note._id.toString());
        }

        const newOrder = new OrderModel(order);

        await newOrder.save();

        return res
            .status(201)
            .json(successResponse(newOrder, "Order created successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
