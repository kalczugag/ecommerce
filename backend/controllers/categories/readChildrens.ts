import express from "express";
import { isValidObjectId } from "mongoose";
import { CategoryModel } from "@/models/Categories";

export const getChildrens = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res.status(400).json({ error: "Category ID is required" });
    }

    try {
        const categoryChilrdens = await CategoryModel.find({
            parentCategory: id,
        });

        if (!categoryChilrdens) {
            return res
                .status(404)
                .json({ error: "Category childrens not found" });
        }

        return res.status(200).json(categoryChilrdens);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
