import { buildQueryParams } from "@/utils/queryHelpers";
import { apiSlice } from "./apiSlice";
import type { Category, GroupedCategories } from "@/types/Category";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<
            ApiResponseArray<Category>,
            Paginate | void
        >({
            query: (params: Paginate = {}) => {
                const queryParams = buildQueryParams({
                    filter: params.filter,
                    sort: params.sort,
                });

                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
                }
                if (params?.named !== undefined) {
                    queryParams.named = params.named.toString();
                }
                
                return {
                    url: "/categories",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (result) =>
                result
                    ? result.data.map((category) => ({
                          type: "Categories",
                          id: category._id,
                      }))
                    : [{ type: "Categories", id: "LIST" }],
        }),

        getGroupedCategories: builder.query<
            ApiResponseObject<GroupedCategories>,
            Paginate | void
        >({
            query: (params: Paginate = {}) => {
                const queryParams = buildQueryParams({
                    filter: params.filter,
                    sort: params.sort,
                });

                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
                }

                return {
                    url: "/categories",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
        }),

        getCategoryById: builder.query<Category, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [
                { type: "Categories", id: id },
            ],
        }),

        getCategoriesByLevel: builder.query<Category[], string>({
            query: (level) => ({
                url: "/categories/byLevel",
                method: "GET",
                params: { level },
            }),
        }),

        getChildrens: builder.query<Category[], string>({
            query: (id) => ({
                url: `/categories/${id}/childrens`,
                method: "GET",
            }),
        }),

        addCategory: builder.mutation<Category, Category>({
            query: (values) => ({
                url: "/categories",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Categories", id: values._id },
            ],
        }),

        editCategory: builder.mutation<Category, Category>({
            query: (values) => ({
                url: `/categories/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Categories", id: values._id },
                { type: "Categories", id: "LIST" },
            ],
        }),

        deleteCategory: builder.mutation<Category, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Categories", id: id },
            ],
        }),
    }),
});

export const {
    useGetAllCategoriesQuery,
    useGetGroupedCategoriesQuery,
    useGetCategoryByIdQuery,
    useGetCategoriesByLevelQuery,
    useGetChildrensQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
