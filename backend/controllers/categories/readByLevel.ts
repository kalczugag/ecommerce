import express from "express";
import { CategoryModel } from "../../models/Categories";

export const getCategoryByLevel = async (
    req: express.Request<{}, {}, {}, { level: string }>,
    res: express.Response
) => {
    const { level } = req.query;

    if (!level) {
        return res.status(400).send({ error: "Category level is required" });
    }

    try {
        const categories = await CategoryModel.find({ level: level })
            .populate("_parentCategory", "name")
            .lean()
            .exec();

        if (!categories) {
            return res.status(404).json({ error: "Categories not found" });
        }

        let labelledCategories;
        if (level === "secondLevel") {
            labelledCategories = categories.map((category) => {
                if (
                    category?._parentCategory &&
                    typeof category._parentCategory === "object"
                ) {
                    return {
                        ...category,
                        name: `${category._parentCategory.name} - ${category.name}`,
                    };
                }
            });
        }

        return res.status(200).json(labelledCategories || categories);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
