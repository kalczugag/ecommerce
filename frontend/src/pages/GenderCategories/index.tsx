import ProductsList from "../../components/ProductsList";
import Sidebar from "../../components/Sidebar";
import ListLayout from "../../layouts/ListLayout";
import { useFilter, useFilterProps } from "../../hooks/useFilter";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const GenderCategories = () => {
    const simplifiedData = useFilterProps(data);
    const { handleSubmit, filteredData } = useFilter(
        data,
        simplifiedData.maxPrice
    );

    return (
        <ListLayout>
            <Sidebar data={simplifiedData} onSubmit={handleSubmit} />
            <ProductsList data={filteredData} />
        </ListLayout>
    );
};

export default GenderCategories;
