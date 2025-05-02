import { useSearchParams } from "react-router-dom";

const arrayKey = ["price", "discountPercent"];

/**
 * @description
 * Customized useSearchParams hook which does not override the existing search params
 */
export const useQueryParams = (): [
    URLSearchParams,
    (params: Record<string, string>) => void,
    () => void
] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setQueryParams = (
        params: Record<string, string | [number, number]>
    ) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);

            Object.entries(params).forEach(([key, value]) => {
                if (
                    arrayKey.includes(key) &&
                    Array.isArray(value) &&
                    value.length === 2
                ) {
                    if (value[0] !== null && value[0] !== undefined) {
                        newParams.set(`${key}>`, value[0].toString());
                    } else {
                        newParams.delete(`${key}>`);
                    }

                    if (value[1] !== null && value[1] !== undefined) {
                        newParams.set(`${key}<`, value[1].toString());
                    } else {
                        newParams.delete(`${key}<`);
                    }
                } else {
                    const stringValue = Array.isArray(value)
                        ? value.join(",")
                        : value;

                    if (stringValue === "" || stringValue == null) {
                        newParams.delete(key);
                    } else {
                        newParams.set(key, stringValue);
                    }
                }
            });

            return newParams;
        });
    };

    const clearSearchParams = () => {
        setSearchParams({});
    };

    return [searchParams, setQueryParams, clearSearchParams];
};
