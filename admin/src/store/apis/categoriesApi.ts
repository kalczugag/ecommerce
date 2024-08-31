import { apiSlice } from "./apiSlice";
import type { Category } from "@/types/Category";

export const categoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategories: builder.query<Category[], void>({
            query: () => ({
                url: "/categories",
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result) =>
                result
                    ? result.map((category) => ({
                          type: "Categories",
                          id: category._id,
                      }))
                    : [{ type: "Categories", id: "LIST" }],
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

        deleteCategory: builder.mutation<string, string>({
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
    useGetCategoryByIdQuery,
    useGetCategoriesByLevelQuery,
    useGetChildrensQuery,
    useAddCategoryMutation,
    useEditCategoryMutation,
    useDeleteCategoryMutation,
} = categoryApi;
