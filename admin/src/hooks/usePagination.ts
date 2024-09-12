import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Pagination = {
    page?: number;
    pageSize?: number;
};

const usePagination = (): [
    { page: number; pageSize: number },
    (value: Pagination) => void
] => {
    const location = useLocation();
    const navigate = useNavigate();

    const getPaginationFromUrl = () => {
        const queryParams = new URLSearchParams(location.search);
        const page = parseInt(queryParams.get("page")!) || 0;
        const pageSize = parseInt(queryParams.get("pageSize")!) || 5;
        return { page, pageSize };
    };

    const [pagination, setPagination] = useState(getPaginationFromUrl);

    useEffect(() => {
        setPagination(getPaginationFromUrl());
    }, [location.search]);

    useEffect(() => {
        navigate(`?page=${pagination.page}&pageSize=${pagination.pageSize}`, {
            replace: true,
        });
        window.scrollTo(0, 0);
    }, [pagination, navigate]);

    const handleSetPagination = (value: Pagination) => {
        setPagination((prev) => ({
            page: value.page ?? prev.page,
            pageSize: value.pageSize ?? prev.pageSize,
        }));
    };

    return [pagination, handleSetPagination];
};

export default usePagination;
