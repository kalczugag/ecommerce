import express from "express";
import schema from "./schemaValidate";
import { TaxModel } from "../../../models/Tax";
import type { Tax } from "../../../types/Tax";

export const createTax = async (
    req: express.Request<{}, {}, Tax>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newTax = new TaxModel(req.body);

        await newTax.save();

        return res
            .status(201)
            .json({ msg: "Tax added successfully", data: newTax });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
