import express from "express";
import _ from "lodash";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { ProductModel } from "../../../models/Product";
import { CategoryModel } from "../../../models/Categories";
import type { Category } from "../../../types/Category";
import mongoose from "mongoose";

export const getFilters = async (
    req: express.Request<{}, {}, {}, { category: string }>,
    res: express.Response
) => {
    const { category } = req.query;

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
                if (topLevelCategoryId) {
                    const category = topLevelCategoryId[0].id;
                    query.topLevelCategory = new mongoose.Types.ObjectId(
                        category
                    );
                }
            }

            if (categoryNames.length > 1) {
                const topLevelCategoryId = categoryMap[categoryNames[0]];
                const secondLevelCategoryId = categoryMap[categoryNames[1]];
                if (secondLevelCategoryId) {
                    const matchedCategory = secondLevelCategoryId.filter(
                        (cat) => cat.parentId === topLevelCategoryId[0].id
                    );

                    if (matchedCategory) {
                        query.secondLevelCategory = new mongoose.Types.ObjectId(
                            matchedCategory[0].id
                        );
                    }
                }
            }

            if (categoryNames.length > 2) {
                const thirdLevelCategoryId = categoryMap[categoryNames[2]];
                if (thirdLevelCategoryId) {
                    const category = thirdLevelCategoryId[0].id;
                    query.thirdLevelCategory = new mongoose.Types.ObjectId(
                        category
                    );
                }
            }
        } catch (error) {
            return res
                .status(500)
                .json(errorResponse(null, "Internal server error"));
        }
    }

    try {
        const [
            colorAggregation,
            sizeAggregation,
            priceAggregation,
            brandAggregation,
            discountAggregation,
            availabilityAggregation,
        ] = await Promise.all([
            // color
            ProductModel.aggregate([
                { $match: query },
                { $group: { _id: "$color", count: { $sum: 1 } } },
                { $project: { color: "$_id", count: 1, _id: 0 } },
                { $sort: { count: -1 } },
            ]),

            // size
            ProductModel.aggregate([
                { $match: query },
                {
                    $lookup: {
                        from: "categories",
                        localField: "topLevelCategory",
                        foreignField: "_id",
                        as: "topCategory",
                    },
                },
                {
                    $unwind: {
                        path: "$topLevelCategory",
                        preserveNullAndEmptyArrays: true,
                    },
                },
                { $unwind: "$size" },
                {
                    $group: {
                        _id: {
                            categoryId: "$topLevelCategory",
                            categoryName: {
                                $ifNull: ["$topLevelCategory.name", "Unknown"],
                            },
                            sizeName: "$size.name",
                        },
                        count: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        categoryId: "$_id.categoryId",
                        categoryName: "$_id.categoryName",
                        size: "$_id.sizeName",
                        count: 1,
                    },
                },
                { $sort: { categoryName: 1, size: 1 } },
            ]),

            // price
            ProductModel.aggregate([
                { $match: query },
                {
                    $group: {
                        _id: null,
                        minPrice: { $min: "$price" },
                        maxPrice: { $max: "$price" },
                    },
                },
            ]),

            // brand
            ProductModel.aggregate([
                { $match: query },
                { $group: { _id: "$brand", count: { $sum: 1 } } },
                { $project: { brand: "$_id", count: 1, _id: 0 } },
                { $sort: { brand: 1 } },
            ]),

            // discount
            ProductModel.aggregate([
                { $match: query },
                {
                    $project: {
                        hasDiscount: {
                            $cond: [
                                {
                                    $gt: [
                                        { $ifNull: ["$discountPercentage", 0] },
                                        0,
                                    ],
                                },
                                true,
                                false,
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$hasDiscount",
                        count: { $sum: 1 },
                    },
                },
                { $project: { hasDiscount: "$_id", count: 1, _id: 0 } },
            ]),

            // availability
            ProductModel.aggregate([
                { $match: query },
                {
                    $project: {
                        inStock: { $gt: ["$quantity", 0] },
                    },
                },
                { $group: { _id: "$inStock", count: { $sum: 1 } } },
                { $project: { inStock: "$_id", count: 1, _id: 0 } },
            ]),
        ]);

        const sizesByCategory: any = {};
        sizeAggregation.forEach((item) => {
            if (!sizesByCategory[item.categoryName]) {
                sizesByCategory[item.categoryName] = [];
            }
            sizesByCategory[item.categoryName].push({
                name: item.size,
                count: item.count,
            });
        });

        const sizesArray = Object.keys(sizesByCategory).map((categoryName) => ({
            categoryName,
            sizes: sizesByCategory[categoryName],
        }));

        const result = {
            colors: colorAggregation,
            sizes: sizesArray,
            priceRange:
                priceAggregation.length > 0
                    ? {
                          min: priceAggregation[0].minPrice,
                          max: priceAggregation[0].maxPrice,
                      }
                    : { min: 0, max: 0 },
            brands: brandAggregation,
            discounts: discountAggregation,
            availability: availabilityAggregation,
        };

        return res.status(200).json(successResponse(result));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
