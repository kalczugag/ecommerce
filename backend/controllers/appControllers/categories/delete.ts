import express from "express";
import { isValidObjectId } from "mongoose";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import { CategoryModel } from "../../../models/Categories";

export const deleteCategory = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        return res
            .status(400)
            .json(errorResponse(null, "Invalid category ID format", 400));
    }

    try {
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        await CategoryModel.deleteMany({ _parentCategory: id });

        if (!deletedCategory) {
            return res
                .status(404)
                .json(errorResponse(null, "Category not found", 404));
        }

        return res.json(successResponse(deletedCategory));
    } catch (error) {
        console.error(error);
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
