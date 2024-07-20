import { useFilter, useFilterProps } from "../../hooks/useFilter";
import usePagination from "../../hooks/usePagination";
import ListLayout from "../../layouts/ListLayout";
import { Pagination } from "@mui/material";
import ProductsList from "../../components/ProductsList";
import Sidebar from "../../components/Sidebar";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const ROWS_PER_PAGE = 8;

const Category = () => {
    const [handlePageChange, page] = usePagination();
    const simplifiedData = useFilterProps(data);
    const { handleSubmit, filteredData } = useFilter(
        data,
        simplifiedData.maxPrice
    );

    const count = Math.ceil(filteredData.length / ROWS_PER_PAGE);

    return (
        <ListLayout
            pagination={
                <Pagination
                    count={count}
                    page={page}
                    onChange={handlePageChange}
                    sx={{ marginTop: "60px", alignSelf: "center" }}
                />
            }
        >
            <Sidebar data={simplifiedData} onSubmit={handleSubmit} />
            <ProductsList
                data={filteredData}
                page={page}
                rowsPerPage={ROWS_PER_PAGE}
            />
        </ListLayout>
    );
};

export default Category;
