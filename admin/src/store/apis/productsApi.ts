import { apiSlice } from "./apiSlice";
import type { Product } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ApiResponse<Product>, Paginate | void>({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.page !== undefined) {
                    queryParams.page = params.page.toString();
                }
                if (params?.pageSize !== undefined) {
                    queryParams.pageSize = params.pageSize.toString();
                }
                return {
                    url: "/products",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (result) =>
                result
                    ? result.data.map((product) => ({
                          type: "Products",
                          id: product._id,
                      }))
                    : [{ type: "Products", id: "LIST" }],
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Products", id: id }],
        }),

        addProduct: builder.mutation<Product, Product>({
            query: (values) => ({
                url: "/products",
                method: "POST",
                body: values,
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
