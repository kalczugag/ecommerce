import { serialize } from "@/utils/helpers";
import { apiSlice } from "./apiSlice";
import type { Category, GroupedCategories } from "@/types/Category";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<
            ApiResponseArray<Category>,
            Paginate | void
        >({
            query: ({ skip, limit, named, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (named !== undefined) {
                    queryParams.named = named.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/categories",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (data) =>
                data
                    ? data.result.map((category) => ({
                          type: "Categories",
                          id: category._id,
                      }))
                    : [{ type: "Categories", id: "LIST" }],
        }),

        getGroupedCategories: builder.query<
            ApiResponseObject<GroupedCategories>,
            Paginate | void
        >({
            query: ({ skip, limit, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/categories",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
        }),

        getCategoryById: builder.query<ApiResponseObject<Category>, string>({
            query: (id) => ({
                url: `/categories/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [
                { type: "Categories", id: id },
            ],
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

        getChildrens: builder.query<ApiResponseArray<Category>, string>({
            query: (id) => ({
                url: `/categories/${id}/childrens`,
                method: "GET",
            }),
        }),

        addCategory: builder.mutation<ApiResponseObject<Category>, Category>({
            query: (values) => ({
                url: "/categories",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Categories", id: values._id },
            ],
        }),

        editCategory: builder.mutation<ApiResponseObject<Category>, Category>({
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

        deleteCategory: builder.mutation<ApiResponseObject<Category>, string>({
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
