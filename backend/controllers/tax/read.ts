import express from "express";
import { TaxModel } from "../../models/Tax";
import type { PaginatedTaxes } from "../../types/Tax";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getAllTaxes = async (
    req: express.Request<{}, {}, {}, PaginatedTaxes>,
    res: express.Response
) => {
    const parsedQuery = parser.parse(req.query);

    const page = parsedQuery.skip
        ? parseInt(parsedQuery.skip as unknown as string, 10)
        : 0;
    const pageSize = parsedQuery.limit
        ? parseInt(parsedQuery.limit as unknown as string, 10)
        : 5;

    try {
        const taxes = await TaxModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(parsedQuery.select)
            .sort(parsedQuery.sort)
            .skip(page * pageSize)
            .limit(pageSize)
            .exec();

        const totalDocuments = await TaxModel.countDocuments(
            parsedQuery.filter
        );

        if (!taxes || taxes.length === 0) {
            return res.status(404).json({ error: "No taxes found" });
        }

        return res.status(200).json({ data: taxes, count: totalDocuments });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
