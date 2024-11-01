import { useMemo, useState } from "react";
import type { SortConfigProps } from "@/pages/Products/list/config";

const useSortedData = (data: any[], initialSortConfig: SortConfigProps[]) => {
    const [sortCriteria, setSortCriteria] = useState<
        { label: string; value: string }[]
    >([]);

    const sortedData = useMemo(() => {
        if (!data) return [];

        let sorted = [...data];

        sortCriteria.forEach(({ label, value }) => {
            const configItem = initialSortConfig.find(
                (config) => config.label.toLowerCase() === label
            );

            if (!configItem || !configItem.criteria) return;

            if (value === "asc" || value === "desc") {
                sorted.sort((a, b) =>
                    value === "asc"
                        ? a[configItem.criteria] - b[configItem.criteria]
                        : b[configItem.criteria] - a[configItem.criteria]
                );
            } else {
                if (configItem.criteria === "quantity") {
                    if (value === "more than 10") {
                        sorted = sorted.filter(
                            (item) => item[configItem.criteria] > 10
                        );
                    } else if (value === "less than 10") {
                        sorted = sorted.filter(
                            (item) => item[configItem.criteria] < 10
                        );
                    }
                } else {
                    sorted = sorted.filter(
                        (item) => item[configItem.criteria] === value
                    );
                }
            }
        });

        return sorted;
    }, [data, sortCriteria, initialSortConfig]);

    return { sortedData, setSortCriteria };
};

export default useSortedData;
