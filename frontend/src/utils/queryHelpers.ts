export interface QueryConfig {
    filter?: Record<string, any>;
    sort?: Record<string, any>;
}

export const buildQueryParams = (
    config: QueryConfig
): Record<string, string> => {
    const queryParams: Record<string, string> = {};

    Object.entries(config).forEach(([key, value]) => {
        if (value !== undefined) {
            if (typeof value === "object" && key === "filter") {
                Object.entries(value).forEach(
                    ([filterKey, filterValue]: [string, any]) => {
                        if (
                            typeof filterValue === "object" &&
                            filterValue !== null
                        ) {
                            Object.entries(filterValue).forEach(
                                ([operator, operatorValue]: [string, any]) => {
                                    queryParams[
                                        `filter[${filterKey}][${operator}]`
                                    ] = operatorValue.toString();
                                }
                            );
                        } else {
                            queryParams[`filter[${filterKey}]`] =
                                filterValue.toString();
                        }
                    }
                );
            } else if (key === "sort" && typeof value === "string") {
                queryParams.sort = value;
            } else if (typeof value !== "object") {
                queryParams[key] = value.toString();
            }
        }
    });

    return queryParams;
};
