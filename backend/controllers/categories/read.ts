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
    const { category, sorted, named, page, pageSize } = req.query;

    try {
        const filter = category ? { name: category } : {};

        const totalDocuments = await CategoryModel.countDocuments(filter);

        const categories = await CategoryModel.find(filter)
            .populate("parentCategory", "name")
            .skip(page * pageSize)
            .limit(pageSize)
            .lean()
            .exec();

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        let modifiedCategories = categories;

        if (named) {
            modifiedCategories = categories.map((category) => {
                if (
                    category.level !== "thirdLevel" &&
                    category?.parentCategory
                ) {
                    return {
                        ...category,
                        name: `${
                            (category.parentCategory as Category).name
                        } - ${category.name}`,
                    };
                }
                return category;
            });
        }

        let finalCategories: any;
        if (sorted) {
            finalCategories = _.groupBy(modifiedCategories, "level");

            finalCategories = {
                topLevelCategories: finalCategories["topLevel"] || [],
                secondLevelCategories: finalCategories["secondLevel"] || [],
                thirdLevelCategories: finalCategories["thirdLevel"] || [],
            };
        }

        return res.status(200).json({
            data: sorted ? finalCategories : modifiedCategories,
            count: totalDocuments,
        });
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
