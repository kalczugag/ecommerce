import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilter, useFilterProps } from "../../hooks/useFilter";
import ListLayout from "../../layouts/ListLayout";
import ProductsList from "../../components/ProductsList";
import Sidebar from "../../components/Sidebar";
import data from "../../testData/ecommerce-products-data-master/Women/women_dress.json";

const rowsPerPage = 8;

const Category = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")!) || 1;

    const [page, setPage] = useState<number>(initialPage);

    const simplifiedData = useFilterProps(data);
    const { handleSubmit, filteredData } = useFilter(
        data,
        simplifiedData.maxPrice
    );

    useEffect(() => {
        navigate(`?page=${page}`);
        window.scrollTo(0, 0);
    }, [page, navigate]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    return (
        <ListLayout
            pagination
            page={page}
            count={Math.ceil(filteredData.length / rowsPerPage)}
            onPageChange={handlePageChange}
        >
            <Sidebar data={simplifiedData} onSubmit={handleSubmit} />
            <ProductsList
                data={filteredData}
                page={page}
                rowsPerPage={rowsPerPage}
            />
        </ListLayout>
    );
};

export default Category;
