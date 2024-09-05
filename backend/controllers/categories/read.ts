import express from "express";
import { CategoryModel } from "@/models/Categories";
import {
    PaginatedCategories,
    Category,
    SortedCategories,
} from "@/types/Category";
import _ from "lodash";

export const getAllCategories = async (
    req: express.Request<{}, {}, {}, PaginatedCategories>,
    res: express.Response
) => {
    const { category, sorted, page, pageSize } = req.query;

    try {
        const filter = category ? { category } : {};

        const totalDocuments = await CategoryModel.countDocuments(filter);

        const categories = await CategoryModel.find(
            category ? { name: category } : {}
        )
            .populate("parentCategory")
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        const sortCategoriesWithLodash = (
            categories: Category[]
        ): SortedCategories => {
            const groupedCategories = _.groupBy(categories, "level");

            return {
                topLevelCategories: groupedCategories["topLevel"] || [],
                secondLevelCategories: groupedCategories["secondLevel"] || [],
                thirdLevelCategories: groupedCategories["thirdLevel"] || [],
            };
        };

        const sortedCategories = sortCategoriesWithLodash(categories);

        return res.status(200).json({
            data: sorted ? sortedCategories : categories,
            count: totalDocuments,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
