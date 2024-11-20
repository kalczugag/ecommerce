import { useState } from "react";

const useSortedData = () => {
    const [sortCriteria, setSortCriteria] = useState<Record<string, any>>({});

    return { sortCriteria, setSortCriteria };
};

export default useSortedData;
