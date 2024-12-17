import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { Product, ProductFilters } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<ApiResponseArray<Product>, any>({
            query: ({ skip, limit, category, ...rest }: Paginate) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (category !== undefined) {
                    queryParams.category = category;
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/products",
                    method: "GET",
                    params: queryParams,
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
                params: {
                    populate:
                        "topLevelCategory secondLevelCategory thirdLevelCategory",
                },
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
