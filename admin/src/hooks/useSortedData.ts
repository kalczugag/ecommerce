import { useState, useEffect } from "react";

interface QueryConfig {
    filter: Record<string, any> | string;
    sort?: Record<string, number>;
}

const useSortedData = () => {
    const [sortCriteria, setSortCriteria] = useState<Record<string, string>>(
        {}
    );

    return { sortCriteria, setSortCriteria };
};

export default useSortedData;
