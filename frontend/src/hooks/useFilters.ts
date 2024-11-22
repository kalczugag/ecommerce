import { useSearchParams } from "react-router-dom";

const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "page")
    );

    const updateFilters = (newFilters: Record<string, any>) => {
        Object.keys(newFilters).forEach(
            (key) =>
                (newFilters[key] === null || newFilters[key] === undefined) &&
                delete newFilters[key]
        );

        setSearchParams(newFilters);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return { filters, updateFilters, clearFilters };
};

export default useFilters;
