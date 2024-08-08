import express from "express";
import Joi from "joi";
import { ProductModel } from "@/models/Product";
import { Product } from "@/types/Product";

const productSchema = Joi.object({
    imageUrl: Joi.string().uri().required(),
    brand: Joi.string().min(2).required(),
    title: Joi.string().min(2).required(),
    color: Joi.string().required(),
    price: Joi.number().positive().required(),
    size: Joi.string().required(),
    quantity: Joi.number().integer().positive().required(),
    topLevelCategory: Joi.string().required(),
    secondLevelCategory: Joi.string().required(),
    thirdLevelCategory: Joi.string().required(),
    description: Joi.string().min(10).required(),
});

export const createProduct = async (
    req: express.Request<{}, {}, Product>,
    res: express.Response
) => {
    const { error } = productSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            error: error.details.map((detail) => detail.message).join(", "),
        });
    }

    try {
        const newProduct = new ProductModel(req.body);

        await newProduct.save();

        return res
            .status(201)
            .json({ msg: "Product added successfully", data: newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
