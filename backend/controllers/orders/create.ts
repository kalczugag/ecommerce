import express from "express";
import schema from "./schemaValidate";
import { OrderModel } from "../../models/Order";
import { NoteModel } from "../../models/Order/Notes";
import type { Order } from "../../types/Order";
import type { User } from "../../types/User";

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
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        if (order.orderNotes && order.orderNotes.length > 0) {
            const notes = await NoteModel.insertMany(order.orderNotes);

            order.orderNotes = notes.map((note) => note._id.toString());
        }

        const newOrder = new OrderModel(order);

        await newOrder.save();

        return res
            .status(201)
            .json({ msg: "Order added successfully", data: newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
