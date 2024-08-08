import express from "express";
import { isValidObjectId } from "mongoose";
import { ProductModel } from "@/models/Product";

export const getProductById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    try {
        const product = await ProductModel.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
