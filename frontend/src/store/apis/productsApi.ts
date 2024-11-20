import { apiSlice } from "./apiSlice";
import type { Product, ProductFilters } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ApiResponseArray<Product>, any>({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
                }
                if (params?.category !== undefined) {
                    queryParams.category = params.category;
                }

                return {
                    url: "/products",
                    method: "GET",
                    params: params,
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

        getProductFilters: builder.query<ProductFilters, string>({
            query: (cat) => {
                return {
                    url: "/products/filters",
                    method: "GET",
                    params: { category: cat },
                };
            },
        }),

        getRandomProduct: builder.query<Product[], void>({
            query: () => ({
                url: "/products?random=true",
                method: "GET",
            }),
        }),

        getProductById: builder.query<Product, string>({
            query: (id) => ({
                url: `/products/id/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Products", id: id }],
        }),
    }),
});

export const {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductFiltersQuery,
    useGetRandomProductQuery,
} = productApi;
