import express from "express";
import { isValidObjectId } from "mongoose";
import { ProductModel } from "../../models/Product";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getProductById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;
    const parsedQuery = parser.parse(req.query);

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    try {
        const product = await ProductModel.findById(id)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .exec();

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
