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
        setSearchParams({
            page: skip.toString(),
            pageSize: limit.toString(),
        });
        window.scrollTo(0, 0);
    }, [limit, setSearchParams, skip]);

    const handleSetPagination = (value: Pagination) => {
        const newSkip = value.skip !== undefined ? value.skip : skip;
        const newLimit = value.limit !== undefined ? value.limit : limit;

        setSearchParams({
            page: newSkip.toString(),
            pageSize: newLimit.toString(),
        });
    };

    return [{ skip, limit }, handleSetPagination];
};

export default usePagination;
