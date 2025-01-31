import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Pagination = {
    skip?: number;
    limit?: number;
};

const usePagination = (): [
    { skip: number; limit: number },
    (value: Pagination) => void
] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const skip = parseInt(searchParams.get("page")!) || 0;
    const limit = parseInt(searchParams.get("pageSize")!) || 5;

    useEffect(() => {
        if (
            searchParams.get("page") !== skip.toString() ||
            searchParams.get("pageSize") !== limit.toString()
        ) {
            const newSearchParams = new URLSearchParams(searchParams);
            newSearchParams.set("page", skip.toString());
            newSearchParams.set("pageSize", limit.toString());
            setSearchParams(newSearchParams);
            window.scrollTo(0, 0);
        }
    }, [skip, limit, searchParams, setSearchParams]);

    const handleSetPagination = (value: Pagination) => {
        const newSkip = value.skip !== undefined ? value.skip : skip;
        const newLimit = value.limit !== undefined ? value.limit : limit;

        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", newSkip.toString());
        newSearchParams.set("pageSize", newLimit.toString());
        setSearchParams(newSearchParams);
    };

    return [{ skip, limit }, handleSetPagination];
};

export default usePagination;
