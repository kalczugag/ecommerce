import express from "express";
import { isValidObjectId } from "mongoose";
import { TaxModel } from "../../../models/Tax";

export const getTaxById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Tax ID is required" });
    }

    try {
        const tax = await TaxModel.findById(id).populate("Category").exec();

        if (!tax) {
            return res.status(404).json({ error: "Tax not found" });
        }

        return res.status(200).json(tax);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
