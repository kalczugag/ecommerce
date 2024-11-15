import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePagination = (): [
    (event: React.ChangeEvent<unknown>, value: number) => void,
    number
] => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get("page")!) || 1;

    const [page, setPage] = useState<number>(initialPage);

    useEffect(() => {
        const updatedParams = new URLSearchParams(location.search);
        updatedParams.set("page", page.toString());

        navigate({ search: updatedParams.toString() }, { replace: true });
        window.scrollTo(0, 0);
    }, [page, navigate, location.search]);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        setPage(value);
    };

    return [handlePageChange, page];
};

export default usePagination;
