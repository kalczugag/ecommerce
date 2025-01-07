import express from "express";
import schema from "./schemaValidate";
import { ReturnModel } from "../../models/Order/Return";
import { OrderModel } from "../../models/Order";
import type { Item, Payment, ReturnOrder } from "../../types/Order";
import type { User } from "../../types/User";

export const createReturn = async (
    req: express.Request<{}, {}, ReturnOrder>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);
    const { _id } = req.user as User;

    const orderReturn = {
        _user: _id,
        ...req.body,
    };

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const order = await OrderModel.findById(orderReturn._order)
            .populate("_payment", "paymentMethod")
            .populate("items", "total")
            .exec();

        if (!order?._payment || order.status === "returned") {
            return res.status(400).json({ error: "Order cannot be returned" });
        }

        const refundAmount = (order.items as Item[]).reduce((acc, item) => {
            return acc + (item?.total || 0);
        }, 0);

        console.log(refundAmount);

        const newReturn = new ReturnModel({
            ...orderReturn,
            refundAmount,
            refundMethod: (order._payment as Payment).paymentMethod,
        });

        await newReturn.save();

        await OrderModel.findByIdAndUpdate(newReturn._order, {
            status: "returned",
        });

        return res
            .status(201)
            .json({ msg: "Return added successfully", data: newReturn });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
