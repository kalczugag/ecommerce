import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Pagination = {
    skip?: number;
    limit?: number;
};

const usePagination = (): [
    { skip: number; limit: number },
    (value: Pagination) => void
] => {
    const location = useLocation();
    const navigate = useNavigate();

    const getPaginationFromUrl = () => {
        const queryParams = new URLSearchParams(location.search);
        const skip = parseInt(queryParams.get("page")!) || 0;
        const limit = parseInt(queryParams.get("pageSize")!) || 5;
        return { skip, limit };
    };

    const [pagination, setPagination] = useState(getPaginationFromUrl);

    useEffect(() => {
        setPagination(getPaginationFromUrl());
    }, [location.search]);

    useEffect(() => {
        navigate(`?page=${pagination.skip}&pageSize=${pagination.limit}`, {
            replace: true,
        });
        window.scrollTo(0, 0);
    }, [pagination, navigate]);

    const handleSetPagination = (value: Pagination) => {
        setPagination((prev) => ({
            skip: value.skip ?? prev.skip,
            limit: value.limit ?? prev.limit,
        }));
    };

    return [pagination, handleSetPagination];
};

export default usePagination;
