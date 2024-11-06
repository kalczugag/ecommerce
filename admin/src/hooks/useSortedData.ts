import { useState, useEffect } from "react";

interface QueryConfig {
    filter: Record<string, any>;
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

        sortCriteria.forEach(({ value }) => {
            if (value.sort) {
                sort = value.sort;
            } else {
                filter = { ...filter, ...value };
            }
        });

        setQueryConfig({
            filter,
            sort: sortCriteria.length > 0 ? sort : undefined,
        });
    }, [sortCriteria]);

    return { queryConfig, setSortCriteria };
};

export default useSortedData;
