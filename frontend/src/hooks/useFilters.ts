import { useSearchParams } from "react-router-dom";

const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "page")
    );

    const updateFilters = (newFilters: Record<string, any>) => {
        const updatedParams = {
            ...filters,
            ...newFilters,
        };

        Object.keys(updatedParams).forEach(
            (key) =>
                (updatedParams[key] === null ||
                    updatedParams[key] === undefined) &&
                delete updatedParams[key]
        );

        setSearchParams(updatedParams);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return { filters, updateFilters, clearFilters };
};

export default useFilters;
