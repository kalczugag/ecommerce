import express from "express";
import _ from "lodash";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";
import { CategoryModel } from "../../../models/Categories";
import type { Category } from "../../../types/Category";

const parser = new MongooseQueryParser();

export const getFilters = async (
    req: express.Request<{}, {}, {}, { category: string }>,
    res: express.Response
) => {
    const { category, ...rest } = req.query;
    const parsedQuery = parser.parse(rest);

    const query: Record<string, unknown> = {};
    const selectQuery =
        "-title -quantity -description -imageUrl -topLevelCategory -secondLevelCategory -thirdLevelCategory";

    if (category) {
        const categoryNames = (category as string)
            .split(",")
            .map((name) => name.trim().toLowerCase());

        try {
            const categories = await CategoryModel.find({
                name: {
                    $in: categoryNames.map(
                        (name) => new RegExp(`^${name}$`, "i")
                    ),
                },
            })
                .populate("_parentCategory", "name _id")
                .exec();

            if (!categories || categories.length === 0) {
                return res
                    .status(404)
                    .json(errorResponse(null, "Category not found", 404));
            }

            const categoryMap = categories.reduce(
                (
                    acc: Record<
                        string,
                        { id: string; parentId: string | undefined }[]
                    >,
                    cat
                ) => {
                    const parentCategoryId = (
                        cat._parentCategory as Category
                    )?._id?.toString();
                    const currentCategoryId = cat._id.toString();
                    const currentCategoryName = cat.name.toLowerCase();

                    if (!acc[currentCategoryName]) {
                        acc[currentCategoryName] = [];
                    }
                    acc[currentCategoryName].push({
                        id: currentCategoryId,
                        parentId: parentCategoryId,
                    });

                    return acc;
                },
                {}
            );

            if (categoryNames.length > 0) {
                const topLevelCategoryId = categoryMap[categoryNames[0]];
                if (topLevelCategoryId)
                    query.topLevelCategory = topLevelCategoryId[0].id;
            }

            if (categoryNames.length > 1) {
                const topLevelCategoryId = categoryMap[categoryNames[0]];
                const secondLevelCategoryId = categoryMap[categoryNames[1]];
                if (secondLevelCategoryId)
                    query.secondLevelCategory = secondLevelCategoryId.filter(
                        (cat) => cat.parentId === topLevelCategoryId[0].id
                    )[0].id;
            }

            if (categoryNames.length > 2) {
                const thirdLevelCategoryId = categoryMap[categoryNames[2]];
                if (thirdLevelCategoryId)
                    query.thirdLevelCategory = thirdLevelCategoryId[0].id;
            }
        } catch (error) {
            return res
                .status(500)
                .json(errorResponse(null, "Internal server error"));
        }
    }

    try {
        const filters = await ProductModel.find(query)
            .populate("topLevelCategory secondLevelCategory thirdLevelCategory")
            .select(selectQuery)
            .sort(parsedQuery.sort)
            .exec();

        if (!filters) {
            return res
                .status(404)
                .json(errorResponse(null, "Filters not found", 404));
        }

        const colorsCount = _.chain(filters)
            .countBy("color")
            .map((count, color) => ({ color, count }))
            .value();

        const availableSizes = _.chain(filters)
            .flatMap("size")
            .map("name")
            .uniq()
            .value();

        const maxPrice = _.chain(filters).map("price").max().value();

        const result = {
            colorsCount,
            availableSizes,
            maxPrice,
        };

        return res.status(200).json(successResponse(result));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
