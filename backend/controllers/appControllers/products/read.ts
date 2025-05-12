import express from "express";
import { MongooseQueryParser } from "mongoose-query-parser";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";
import { CategoryModel } from "../../../models/Categories";
import { WishlistModel } from "../../../models/Wishlist";
import type { PaginatedProducts } from "../../../types/Product";
import type { Category } from "../../../types/Category";
import type { User } from "../../../types/User";

const parser = new MongooseQueryParser();

// Returns an array of products paginated by page and pageSize query parameters.
// If query parameter 'random' is present, returns a single random product.
// If query parameter 'category' is present, filters products by category name.

export const getAllProducts = async (
    req: express.Request<{}, {}, {}, PaginatedProducts>,
    res: express.Response
) => {
    const { random, category, ...rest } = req.query;
    const user = req.user ? (req.user as User) : null;
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
                return res
                    .status(404)
                    .json(errorResponse(null, "No categories", 404));
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
            return res
                .status(500)
                .json(errorResponse(null, "Internal server error"));
        }
    }

    try {
        if (random) {
            const randomProducts = await ProductModel.aggregate()
                .sample(5)
                .exec();

            if (!randomProducts) {
                return res
                    .status(404)
                    .json(errorResponse(null, "No products", 404));
            }

            return res.status(200).json(successResponse(randomProducts));
        }

        const combinedFilters = { ...query, ...parsedQuery.filter };
        const isQuery = query ? combinedFilters : parsedQuery.filter;

        const totalDocuments = await ProductModel.countDocuments(isQuery);

        let products = await ProductModel.find(isQuery)
            .populate("topLevelCategory secondLevelCategory thirdLevelCategory")
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .lean()
            .exec();

        if (!products || products.length === 0) {
            return res
                .status(404)
                .json(errorResponse(null, "No products", 404));
        }

        if (user) {
            const wishlist = await WishlistModel.findById(user._wishlist, {
                products: 1,
            });
            const wishlistedSet = new Set(
                wishlist?.products?.map((p) => p.toString())
            );

            products = products.map((prod) => ({
                ...(prod ?? prod),
                isFavorite: wishlistedSet.has(prod._id.toString()),
            }));
        }

        const hasMore = (page + 1) * pageSize < totalDocuments;

        return res
            .status(200)
            .json(
                successResponse(
                    products,
                    "OK",
                    200,
                    totalDocuments,
                    hasMore,
                    page + 1
                )
            );
    } catch (error) {
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
