import express from "express";
import { ProductModel } from "@/models/Product";
import { PaginatedProducts } from "@/types/Product";

export const getAllProducts = async (
    req: express.Request<{}, {}, {}, PaginatedProducts>,
    res: express.Response
) => {
    const { page = 0, pageSize = 5 } = req.query;

    try {
        const totalDocuments = await ProductModel.countDocuments();

        const products = await ProductModel.find()
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        return res.status(200).json({ data: products, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
