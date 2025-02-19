import { useSearchParams } from "react-router-dom";

/**
 * @description
 * Customized useSearchParams hook which does not override the existing search params
 */
export const useQueryParams = (): [
    URLSearchParams,
    (params: Record<string, string>) => void
] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const setQueryParams = (params: Record<string, string>) => {
        setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            Object.entries(params).forEach(([key, value]) => {
                newParams.set(key, value);
            });

            return newParams;
        });
    };

    return [searchParams, setQueryParams];
};
