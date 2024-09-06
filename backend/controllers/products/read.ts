import express from "express";
import { ProductModel } from "@/models/Product";
import { PaginatedProducts, Product } from "@/types/Product";

export const getAllProducts = async (
    req: express.Request<{}, {}, {}, PaginatedProducts>,
    res: express.Response
) => {
    const { category, page = 0, pageSize = 5 } = req.query;

    let query: any = {};
    if (category) {
        const categoryParts = (category as string).split(",");

        if (categoryParts.length > 0) {
            query.topLevelCategory = {
                $regex: new RegExp(`^${categoryParts[0]}$`, "i"),
            };
        }
        if (categoryParts.length > 1) {
            query.secondLevelCategory = {
                $regex: new RegExp(`^${categoryParts[1]}$`, "i"),
            };
        }
        if (categoryParts.length > 2) {
            query.thirdLevelCategory = {
                $regex: new RegExp(`^${categoryParts[2]}$`, "i"),
            };
        }
    }

    try {
        const totalDocuments = await ProductModel.countDocuments(query);

        const products = await ProductModel.find(query)
            .skip(page * pageSize)
            .limit(pageSize)
            .populate("topLevelCategory secondLevelCategory thirdLevelCategory")
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
