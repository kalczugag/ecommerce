import express from "express";
import schema from "./schemaValidate";
import { ProductModel } from "@/models/Product";
import { Product } from "@/types/Product";

export const createProduct = async (
    req: express.Request<{}, {}, Product>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newProduct = new ProductModel(req.body);

        await newProduct.save();

        return res
            .status(201)
            .json({ msg: "Product added successfully", data: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
