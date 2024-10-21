import express from "express";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "../../models/Categories";

export const getCategoryById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Category ID is required" });
    }

    try {
        const category = await CategoryModel.findById(id)
            .populate("parentCategory")
            .exec();

        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
