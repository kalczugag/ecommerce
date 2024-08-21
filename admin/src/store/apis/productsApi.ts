import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/Product";

export const productApi = createApi({
    reducerPath: "product",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol +
            "//" +
            window.location.host +
            "/api" +
            "/v1",
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAllProducts: builder.query<Product[], void>({
            query: () => ({
                url: "/products",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            providesTags: (result) =>
                result
                    ? result.map((product) => ({
                          type: "Products",
                          id: product._id,
                      }))
                    : [{ type: "Products", id: "LIST" }],
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            providesTags: (result, error, id) => [{ type: "Products", id: id }],
        }),

        addProduct: builder.mutation<Product, Product>({
            query: (values) => ({
                url: "/products",
                method: "POST",
                body: values,
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Products", id: values._id },
            ],
        }),

        editProduct: builder.mutation<Product, Product>({
            query: (values) => ({
                url: `/products/${values._id}`,
                method: "PATCH",
                body: values,
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Products", id: values._id },
                { type: "Products", id: "LIST" },
            ],
        }),

        deleteProduct: builder.mutation<string, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Products", id: id },
            ],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useAddProductMutation,
    useEditProductMutation,
    useDeleteProductMutation,
} = productApi;
