import express from "express";
import { errorResponse, successResponse } from "../../../handlers/apiResponse";
import schema from "./schemaValidate";
import { CategoryModel } from "../../../models/Categories";
import { Category } from "../../../types/Category";

export const createCategory = async (
    req: express.Request<{}, {}, Category>,
    res: express.Response
) => {
    const { error } = schema.validate(req.body);

    if (error) {
        return res
            .status(400)
            .json(
                errorResponse(
                    null,
                    error.details.map((detail) => detail.message).join(", "),
                    400
                )
            );
    }

    try {
        const newCategory = new CategoryModel(req.body);

        await newCategory.save();

        return res
            .status(201)
            .json(
                successResponse(newCategory, "Category added successfully", 201)
            );
    } catch (error) {
        if (error instanceof Error) {
            console.error(error);
            if (error.message.includes("duplicate key")) {
                return res
                    .status(409)
                    .json(
                        errorResponse(
                            null,
                            "Category with this name already exists",
                            409
                        )
                    );
            }
        }
        return res
            .status(500)
            .json(errorResponse(null, "Internal server error"));
    }
};
