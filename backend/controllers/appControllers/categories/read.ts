import express from "express";
import { CategoryModel } from "../../../models/Categories";
import { PaginatedCategories, Category } from "../../../types/Category";
import _ from "lodash";
import { MongooseQueryParser } from "mongoose-query-parser";
import { redisClient } from "../../../config/redis";

const parser = new MongooseQueryParser();

export const getAllCategories = async (
    req: express.Request<{}, {}, {}, PaginatedCategories>,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    const { category, sorted, named, ...rest } = req.query;
    const parsedQuery = parser.parse(rest);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const query = CategoryModel.find(parsedQuery.filter)
            .populate("_parentCategory", "name")
            .select(parsedQuery.select)
            .sort(parsedQuery.sort);

        if (parsedQuery.skip != null) {
            query.skip(page * pageSize);
        }

        if (parsedQuery.limit != null) {
            query.limit(pageSize);
        }

        const categories = await query.lean().exec();

        const totalDocuments = await CategoryModel.countDocuments(
            parsedQuery.filter
        );

        if (!categories || categories.length === 0) {
            return res.status(404).json({ error: "No categories found" });
        }

        let modifiedCategories = categories;
        if (named) {
            modifiedCategories = categories.map((category) => {
                if (
                    category.level !== "thirdLevel" &&
                    category?._parentCategory
                ) {
                    return {
                        ...category,
                        name: `${
                            (category._parentCategory as Category).name
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

        const resultData = {
            data: sorted ? finalCategories : modifiedCategories,
            count: totalDocuments,
        };

        await redisClient.set(cacheKey, JSON.stringify(resultData), "EX", 3600);

        return res.status(200).json(resultData);
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
