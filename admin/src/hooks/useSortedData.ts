import { useState, useEffect } from "react";

interface QueryConfig {
    filter: Record<string, any> | string;
    sort?: Record<string, number>;
}

const useSortedData = () => {
    const [sortCriteria, setSortCriteria] = useState<
        { label: string; value: any }[]
    >([]);
    const [queryConfig, setQueryConfig] = useState<QueryConfig>({ filter: {} });

    useEffect(() => {
        let filter: Record<string, any> = {};
        let sort: Record<string, number> = {};
        const orCondition: Record<string, any>[] = [];

        sortCriteria.forEach(({ value, label }) => {
            if (value.sort) {
                sort = value.sort;
            } else if (value.searchTerm) {
                orCondition.push({
                    [label]: value.searchTerm,
                });
            } else {
                filter = { ...filter, ...value };
            }
        });

        setQueryConfig({
            filter:
                orCondition.length > 0
                    ? JSON.stringify({ $or: orCondition })
                    : filter,
            sort: sortCriteria.length > 0 ? sort : undefined,
        });
    }, [sortCriteria]);

    return { queryConfig, setSortCriteria };
};

export default useSortedData;
