import express from "express";
import { CategoryModel } from "@/models/Categories";

export const getAllCategories = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const categories = await CategoryModel.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
