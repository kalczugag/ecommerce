import express from "express";
import _ from "lodash";
import { ProductModel } from "../../models/Product";
import { MongooseQueryParser } from "mongoose-query-parser";

const parser = new MongooseQueryParser();

export const getFilters = async (
    req: express.Request,
    res: express.Response
) => {
    const parsedQuery = parser.parse(req.query);

    const selectQuery =
        "-title -quantity -description -imageUrl -topLevelCategory -secondLevelCategory -thirdLevelCategory";

    try {
        const filters = await ProductModel.find(parsedQuery.filter)
            .populate(parsedQuery.populate)
            .select(selectQuery)
            .sort(parsedQuery.sort)
            .exec();

        if (!filters) {
            return res.status(404).json({ error: "Error getting filters" });
        }

        const colorsCount = _.chain(filters)
            .countBy("color")
            .map((count, color) => ({ color, count }))
            .value();

        const availableSizes = _.chain(filters)
            .flatMap("size")
            .map("name")
            .uniq()
            .value();

        const maxPrice = _.chain(filters).map("price").max().value();

        const result = {
            colorsCount,
            availableSizes,
            maxPrice,
        };

        return res.status(200).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
