import ProductsList from "../../components/ProductsList";
import ProductsPage from "../../layouts/Layout/ProductsPage";
import _ from "lodash";
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

    const simplifiedData = {
        colorsCount: uniqueColorsCount,
        availableSizes: availableSizes,
        maxPrice: maxPrice,
    };

    return (
        <ProductsPage data={simplifiedData}>
            <ProductsList data={data} />
        </ProductsPage>
    );
};

export default GenderCategories;
