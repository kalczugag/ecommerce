import express from "express";
import { CategoryModel } from "@/models/Categories";

export const getCategoryByLevel = async (
    req: express.Request<{}, {}, {}, { level: string }>,
    res: express.Response
) => {
    const { level } = req.query;

    if (!level) {
        return res.status(400).send({ error: "Category level is required" });
    }

    try {
        const categories = await CategoryModel.find({ level: level });

        if (!categories) {
            return res.status(404).json({ error: "Categories not found" });
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
