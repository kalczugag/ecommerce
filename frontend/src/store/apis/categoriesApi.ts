import { apiSlice } from "./apiSlice";
import type { GroupedCategories } from "@/types/Category";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGroupedCategories: builder.query<
            ApiResponseObject<GroupedCategories>,
            Paginate | void
        >({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.sorted !== undefined) {
                    queryParams.sorted = params.sorted.toString();
                }
                return {
                    url: "/categories",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
        }),
    }),
});

export const { useGetGroupedCategoriesQuery } = categoryApi;
