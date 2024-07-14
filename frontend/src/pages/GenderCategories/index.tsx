import { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../hooks/useStore";
import { setData } from "../../store";
import _ from "lodash";
import ProductsList from "../../components/ProductsList";
import ListLayout from "../../layouts/ListLayout";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const GenderCategories = () => {
    const dispatch = useAppDispatch();

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

    useEffect(() => {
        dispatch(setData(simplifiedData));
    }, [dispatch, simplifiedData]);

    return (
        <ListLayout>
            <ProductsList data={data} />
        </ListLayout>
    );
};

export default GenderCategories;
