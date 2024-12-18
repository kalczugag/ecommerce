import express from "express";
import { ProductModel } from "../../models/Product";
import { CategoryModel } from "../../models/Categories";
import { PaginatedProducts } from "../../types/Product";
import { Category } from "../../types/Category";
import { redisClient } from "../../server";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

// Returns an array of products paginated by page and pageSize query parameters.
// If query parameter 'random' is present, returns a single random product.
// If query parameter 'category' is present, filters products by category name.

export const getAllProducts = async (
    req: express.Request<{}, {}, {}, PaginatedProducts>,
    res: express.Response
) => {
    const cacheKey = res.locals.cacheKey;

    const { random, category, ...rest } = req.query;
    const parsedQuery = parser.parse(rest);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    const query: Record<string, unknown> = {};

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
                return res.status(404).json({ error: "Category not found" });
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

            //make double check conditional
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
            return res.status(500).json({ error: "Internal server error" });
        }
    }

    try {
        if (random) {
            const randomProducts = await ProductModel.aggregate()
                .sample(5)
                .exec();

            if (!randomProducts) {
                return res.status(404).json({ error: "No products found" });
            }

            return res.status(200).json(randomProducts);
        }

        const combinedFilters = { ...query, ...parsedQuery.filter };
        const isQuery = query ? combinedFilters : parsedQuery.filter;

        const products = await ProductModel.find(isQuery)
            .populate("topLevelCategory secondLevelCategory thirdLevelCategory")
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await ProductModel.countDocuments(isQuery);

        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        const resultData = { data: products, count: totalDocuments };

        await redisClient.set(cacheKey, JSON.stringify(resultData), "EX", 3600);

        return res.status(200).json(resultData);
    } catch (error) {
        return res
            .status(500)
            .json({ data: [], error: "Internal server error" });
    }
};
