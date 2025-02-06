import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type Pagination = {
    skip?: number;
    limit?: number;
};

const usePagination = (): [
    { skip: number; limit: number },
    (value: Pagination) => void,
    () => void
] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const skip = parseInt(searchParams.get("page")!) || 0;
    const limit = parseInt(searchParams.get("pageSize")!) || 5;

    useEffect(() => {
        if (
            searchParams.get("page") !== skip.toString() ||
            searchParams.get("pageSize") !== limit.toString()
        ) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set("page", skip.toString());
                newParams.set("pageSize", limit.toString());
                return newParams;
            });

            window.scrollTo(0, 0);
        }
    }, [skip, limit, searchParams, setSearchParams]);

    const handleSetPagination = (value: Pagination) => {
        const newSkip = value.skip !== undefined ? value.skip : skip;
        const newLimit = value.limit !== undefined ? value.limit : limit;

        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", newSkip.toString());
            newParams.set("pageSize", newLimit.toString());
            return newParams;
        });
    };

    const resetValues = () => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("page", "0");
            newParams.set("pageSize", "5");
            return newParams;
        });
    };

    return [{ skip, limit }, handleSetPagination, resetValues];
};

export default usePagination;
