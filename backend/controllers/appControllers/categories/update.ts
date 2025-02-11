import express from "express";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "../../../models/Categories";
import { Category } from "../../../types/Category";

export const updateCategory = async (
    req: express.Request<{ id: string }, {}, Category>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Invalid category ID format" });
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res.status(400).json({ error: "No update fields provided" });
    }

    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
