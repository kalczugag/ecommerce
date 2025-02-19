import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { TaxModel } from "../../../models/Tax";

export const getTaxById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid tax ID format", 400));
    }

    try {
        const tax = await TaxModel.findById(id).populate("Category").exec();

        if (!tax) {
            return res
                .status(404)
                .json(errorResponse(null, "Tax not found", 404));
        }

        return res.status(200).json(successResponse(tax));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
