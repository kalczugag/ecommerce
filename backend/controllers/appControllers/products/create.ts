import express from "express";
import schema from "./schemaValidate";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { generateSKU } from "../../../utils/generateSKU";
import { ProductModel } from "../../../models/Product";
import { Product } from "../../../types/Product";

export const createProduct = async (
    req: express.Request<{}, {}, Product>,
    res: express.Response
) => {
    const sku = await generateSKU(req.body);

    const { error } = schema.validate({ ...req.body, sku });

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
        const newProduct = new ProductModel(req.body);

        await newProduct.save();

        return res
            .status(201)
            .json(
                successResponse(newProduct, "Product added successfully", 201)
            );
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
