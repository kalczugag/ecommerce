import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CategoryModel } from "../../../models/Categories";

export const getCategoryByLevel = async (
    req: express.Request<{}, {}, {}, { level: string }>,
    res: express.Response
) => {
    const { level } = req.query;

    if (!level) {
        return res
            .status(400)
            .send(errorResponse(null, "Category level is required", 400));
    }

    try {
        const categories = await CategoryModel.find({ level: level })
            .populate("_parentCategory", "name")
            .lean()
            .exec();

        if (!categories) {
            return res
                .status(404)
                .json(errorResponse(null, "Categories not found", 404));
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

        return res
            .status(200)
            .json(successResponse(labelledCategories || categories));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
