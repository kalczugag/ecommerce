import express from "express";
import { CategoryModel } from "@/models/Categories";
import { PaginatedCategories } from "@/types/Category";

export const getAllCategories = async (
    req: express.Request<{}, {}, {}, PaginatedCategories>,
    res: express.Response
) => {
    const { level, page = 0, pageSize = 5 } = req.query;

    try {
        const filter = level ? { level } : {};

        const totalDocuments = await CategoryModel.countDocuments(filter);

        const categories = await CategoryModel.find()
            .populate("parentCategory")
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        return res
            .status(200)
            .json({ data: categories, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
