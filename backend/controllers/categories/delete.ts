import express from "express";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "../../models/Categories";

export const deleteCategory = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Category ID is required" });
    }

    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        await CategoryModel.deleteMany({ parentCategory: id });

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found" });
        }

        return res.json(deletedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
