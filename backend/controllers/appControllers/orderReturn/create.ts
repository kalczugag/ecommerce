import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { ReturnModel } from "../../../models/Order/Return";
import { OrderModel } from "../../../models/Order";
import type { Item, Payment, ReturnOrder } from "../../../types/Order";
import type { User } from "../../../types/User";

export const createReturn = async (
    req: express.Request<{}, {}, ReturnOrder>,
    res: express.Response
) => {
    const { _id } = req.user as User;

    const orderReturn = {
        _user: _id,
        ...req.body,
    };

    const { error } = schema.validate(orderReturn);

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
        const order = await OrderModel.findById(orderReturn._order)
            .populate("payments", "paymentMethod")
            .populate("items", "total")
            .exec();

        if (
            !order?.payments ||
            order?.payments?.length === 0 ||
            order.status === "returned"
        ) {
            return res.status(400).json(errorResponse(null, "Invalid order"));
        }

        const refundAmount = (order.items as Item[]).reduce((acc, item) => {
            return acc + (item?.total || 0);
        }, 0);

        const newReturn = new ReturnModel({
            ...orderReturn,
            refundAmount,
            refundMethod: (order.payments as Payment[])[0].paymentMethod, // change to selected method
        });

        await newReturn.save();

        await OrderModel.findByIdAndUpdate(newReturn._order, {
            status: "returned",
        });

        return res
            .status(201)
            .json(successResponse(newReturn, "Return added successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
