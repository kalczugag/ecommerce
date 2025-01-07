import express from "express";
import { isValidObjectId } from "mongoose";
import { ReturnModel } from "../../models/Order/Return";

export const getReturnById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Return ID is required" });
    }

    try {
        const returnedOrder = await ReturnModel.findById(id)
            .populate("_user", "firstName lastName email phone address")
            .populate("_payment")
            .populate("_order", "items")
            .exec();

        if (!returnedOrder) {
            return res.status(404).json({ error: "Return not found" });
        }

        return res.status(200).json(returnedOrder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
