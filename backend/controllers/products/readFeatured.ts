import express from "express";
import { isValidObjectId } from "mongoose";
import { ProductModel } from "../../models/Product";

export const getFeaturedProducts = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const products = await ProductModel.find({ featured: true }).limit(10);

        if (!products) {
            return res
                .status(404)
                .json({ error: "Featured products not found" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
