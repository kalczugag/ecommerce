import { buildQueryParams } from "@/utils/queryHelpers";
import { apiSlice } from "./apiSlice";
import type { Product } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<
            ApiResponseArray<Product>,
            Paginate | void
        >({
            query: (params: Paginate = {}) => {
                const queryParams = buildQueryParams({
                    filter: params.filter as Record<string, any> | undefined,
                    sort: params.sort,
                });

                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
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
                url: `/products/id/${id}`,
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

        deleteProduct: builder.mutation<Product, string>({
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
