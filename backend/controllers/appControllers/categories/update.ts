import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CategoryModel } from "../../../models/Categories";
import { Category } from "../../../types/Category";

export const updateCategory = async (
    req: express.Request<{ id: string }, {}, Partial<Category>>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid category ID format", 400));
    }

    const updates = req.body;

    if (Object.keys(updates).length === 0) {
        return res
            .status(400)
            .json(errorResponse(null, "No update fields provided", 400));
    }

    try {
        const updatedCategory = await CategoryModel.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return res
                .status(404)
                .json(errorResponse(null, "Category not found", 404));
        }

        return res.status(200).json(successResponse(updatedCategory));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
