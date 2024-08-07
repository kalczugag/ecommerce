import express from "express";
import { Product } from "@/models/Product";
import { ProductProps } from "@/types/Product";

export const getAllProducts = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const products = await Product.find();

        if (!products || products.length === 0) {
            return res.status(404).json({ error: "No products found" });
        }

        return res.status(200).json(products);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export const getProductById = async (
    req: express.Request<{ id: string }>,
    res: express.Response
) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    try {
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};

export const addProduct = async (
    req: express.Request<{}, {}, ProductProps>,
    res: express.Response
) => {
    const {
        imageUrl,
        brand,
        title,
        color,
        price,
        size,
        quantity,
        topLevelCategory,
        secondLevelCategory,
        thirdLevelCategory,
        description,
    } = req.body;

    if (
        !imageUrl ||
        !brand ||
        !title ||
        !color ||
        !price ||
        !size ||
        !quantity ||
        !topLevelCategory ||
        !secondLevelCategory ||
        !thirdLevelCategory ||
        !description
    ) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const newProduct = new Product({
            imageUrl,
            brand,
            title,
            color,
            price,
            size,
            quantity,
            topLevelCategory,
            secondLevelCategory,
            thirdLevelCategory,
            description,
        });

        await newProduct.save();

        return res
            .status(201)
            .json({ msg: "Product added successfully", data: newProduct });
    } catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
};
