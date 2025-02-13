import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { TaxModel } from "../../../models/Tax";
import type { Tax } from "../../../types/Tax";

export const createTax = async (
    req: express.Request<{}, {}, Tax>,
    res: express.Response
) => {
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
        const newTax = new TaxModel(req.body);

        await newTax.save();

        return res
            .status(201)
            .json(successResponse(newTax, "Tax added successfully", 201));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
