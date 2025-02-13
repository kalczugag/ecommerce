import { apiSlice } from "./apiSlice";
import type { GroupedCategories, Category } from "@/types/Category";

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
                };
            },
        }),

        getCategoriesByLevel: builder.query<ApiResponseArray<Category>, string>(
            {
                query: (level) => ({
                    url: "/categories/byLevel",
                    method: "GET",
                    params: { level },
                }),
            }
        ),
    }),
});

export const { useGetGroupedCategoriesQuery, useGetCategoriesByLevelQuery } =
    categoryApi;
