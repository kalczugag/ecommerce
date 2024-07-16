import { useMemo, useState } from "react";
import _ from "lodash";
import type { Filters } from "../types/filters";
import type { Product } from "../types/product";

export const useFilter = (data: Product[], maxPrice: number) => {
    const [filters, setFilters] = useState<Filters>({
        color: "",
        size: "",
        priceRange: [0, maxPrice],
        discountRange: [0, 100],
        availability: true,
    });

    const handleFilterSubmit = (values: Filters) => {
        console.log(values);
        setFilters(values);
    };

    const filterProducts = (products: Product[], filters: Filters) => {
        return products.filter((product) => {
            const isColorMatch =
                !filters.color || product.color === filters.color;
            const isSizeMatch =
                !filters.size ||
                product.size.some((size) => size.name === filters.size);
            const isPriceMatch =
                product.price >= filters.priceRange[0] &&
                product.price <= filters.priceRange[1];
            let isDiscountMatch;
            if (product.discountPersent) {
                isDiscountMatch =
                    product.discountPersent >= filters.discountRange[0] &&
                    product.discountPersent <= filters.discountRange[1];
            }
            const isAvailable = product.size.some(
                (size) => size.quantity > 0 && filters.availability
            );
            return (
                isColorMatch &&
                isSizeMatch &&
                isPriceMatch &&
                isDiscountMatch &&
                isAvailable
            );
        });
    };

    const filteredData = useMemo(
        () => filterProducts(data, filters),
        [data, filters]
    );

    return { handleSubmit: handleFilterSubmit, filteredData };
};

export const useFilterProps = (data: Product[]) => {
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

    return simplifiedData;
};
