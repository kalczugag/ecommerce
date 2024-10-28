import { apiSlice } from "./apiSlice";
import type { Product } from "@/types/Product";

export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllProducts: builder.query<
            ApiResponseArray<Product>,
            Paginate | void
        >({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.page !== undefined) {
                    queryParams.page = params.page.toString();
                }
                if (params?.pageSize !== undefined) {
                    queryParams.pageSize = params.pageSize.toString();
                }
                if (params?.category !== undefined) {
                    queryParams.category = params.category;
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
    useGetRandomProductQuery,
} = productApi;
