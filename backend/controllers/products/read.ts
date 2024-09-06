import express from "express";
import { ProductModel } from "@/models/Product";
import { CategoryModel } from "@/models/Categories";
import { PaginatedProducts } from "@/types/Product";

export const getAllProducts = async (
    req: express.Request<{}, {}, {}, PaginatedProducts>,
    res: express.Response
) => {
    const { category, page = 0, pageSize = 5 } = req.query;

    const query: Record<string, unknown> = {};

    if (category) {
        const categoryNames = (category as string)
            .split(",")
            .map((name) => name.trim().toLowerCase());

        try {
            const categories = await CategoryModel.find({
                name: {
                    $in: categoryNames.map(
                        (name) => new RegExp(`^${name}$`, "i")
                    ),
                },
            }).exec();

            const categoryMap = categories.reduce(
                (acc: Record<string, string>, cat) => {
                    acc[cat.name.toLowerCase()] = cat._id;
                    return acc;
                },
                {}
            );

            if (categoryNames.length > 0) {
                const topLevelCategoryId = categoryMap[categoryNames[0]];
                if (topLevelCategoryId)
                    query.topLevelCategory = topLevelCategoryId;
            }

            if (categoryNames.length > 1) {
                const secondLevelCategoryId = categoryMap[categoryNames[1]];
                if (secondLevelCategoryId)
                    query.secondLevelCategory = secondLevelCategoryId;
            }

            if (categoryNames.length > 2) {
                const thirdLevelCategoryId = categoryMap[categoryNames[2]];
                if (thirdLevelCategoryId)
                    query.thirdLevelCategory = thirdLevelCategoryId;
            }
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
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
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
