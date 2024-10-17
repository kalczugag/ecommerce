import { useMemo, useState } from "react";
import _ from "lodash";
import type { Filters } from "@/types/Filters";
import type { Product } from "@/types/Product";

export interface FilterProps {
    handleSubmit: (values: Filters) => void;
    filteredData: Product[];
}

export const useFilter = (data: Product[], maxPrice: number): FilterProps => {
    const [filters, setFilters] = useState<Filters>({
        color: "",
        size: "",
        priceRange: [0, maxPrice],
        discountRange: [0, 100],
        availability: true,
    });

    const handleFilterSubmit = (values: Filters) => {
        setFilters(values);
    };

    const filterProducts = (products: Product[], filters: Filters) => {
        if (products.length === 0) return [];

        return products.filter((product) => {
            const isColorMatch =
                !filters.color ||
                product.color.toLowerCase() === filters.color.toLowerCase();

            const isSizeMatch =
                !filters.size ||
                product.size.some((size) => size.name === filters.size);

            const isPriceMatch =
                !filters.priceRange ||
                (product.price >= filters.priceRange[0] &&
                    product.price <= filters.priceRange[1]);

            const isDiscountMatch =
                !filters.discountRange ||
                ((product.discountPercent ?? 0) >= filters.discountRange[0] &&
                    (product.discountPercent ?? 0) <= filters.discountRange[1]);

            return (
                isColorMatch && isSizeMatch && isPriceMatch && isDiscountMatch
            );
        });
    };

    const filteredData = useMemo(
        () => filterProducts(data, filters),
        [data, filters]
    );

    return { handleSubmit: handleFilterSubmit, filteredData };
};

export interface SimplifiedDataProps {
    colorsCount: {
        color: string;
        count: number;
    }[];
    availableSizes: string[];
    maxPrice: number;
}

export const useFilterProps = (data: Product[]): SimplifiedDataProps => {
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
