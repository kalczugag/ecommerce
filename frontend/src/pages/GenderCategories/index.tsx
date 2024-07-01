import ProductsList from "../../components/ProductsList";
import DefaultPage from "../../layouts/Layout/DefaultPage";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const GenderCategories = () => {
    return (
        <DefaultPage>
            <ProductsList data={data} />
        </DefaultPage>
    );
};

export default GenderCategories;
