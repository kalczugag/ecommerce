import { useState } from "react";

export const usePaginationControls = (
    initialPageNumber: number,
    initialPageSize: number
) => {
    const [pageNumber, setPageNumber] = useState(initialPageNumber);
    const [pageSize, setPageSize] = useState(initialPageSize);

    const handleSetPageSize = (size: number) => {
        setPageSize(size);
    };

    return {
        pageNumber,
        pageSize,
        setPageNumber,
        setPageSize: handleSetPageSize,
    };
};
