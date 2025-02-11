import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { Product } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<
            ApiResponseArray<Product>,
            Paginate | void
        >({
            query: ({ skip, limit, search, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, any> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (search !== undefined) {
                    queryParams.search = search.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
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
                params: {
                    populate:
                        "topLevelCategory secondLevelCategory thirdLevelCategory",
                },
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

        editProduct: builder.mutation<Product, Partial<Product>>({
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
