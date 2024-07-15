import { useMemo, useState } from "react";
import _ from "lodash";
import ProductsList from "../../components/ProductsList";
import Sidebar from "../../components/Sidebar";
import ListLayout from "../../layouts/ListLayout";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const GenderCategories = () => {
    const colorCounts = _.countBy(data.map((item) => item.color));

    const uniqueColorsCount = Object.keys(colorCounts).map((color) => ({
        color,
        count: colorCounts[color],
    }));

    const availableSizes = _.uniq(
        data.flatMap((item) => item.size.map((size) => size.name))
    );

    const maxPrice = _.maxBy(data, "price")?.price || 1000;

    const simplifiedData = useMemo(
        () => ({
            colorsCount: uniqueColorsCount,
            availableSizes,
            maxPrice,
        }),
        [uniqueColorsCount, availableSizes, maxPrice]
    );

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <ListLayout>
            <Sidebar data={simplifiedData} onSubmit={handleSubmit} />
            <ProductsList data={data} />
        </ListLayout>
    );
};

export default GenderCategories;
