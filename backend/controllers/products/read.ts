import express from "express";
import { ProductModel } from "@/models/Product";

import mongoose from "mongoose";
const Model = mongoose.model("Product");

export const getAllProducts = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const products = await ProductModel.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
