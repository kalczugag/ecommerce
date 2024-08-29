import express from "express";
import schema from "./schemaValidate";
import { CategoryModel } from "@/models/Categories";
import { Category } from "@/types/Category";

export const createCategory = async (
    req: express.Request<{}, {}, Category>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message),
        });
    }

    try {
        const newCategory = new CategoryModel(req.body);

        await newCategory.save();

        return res.status(201).json({
            msg: "Category added successfully",
            data: newCategory,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
