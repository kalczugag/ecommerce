import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { Product, ProductFilters } from "@/types/Product";
import type { Category } from "@/types/Category";

export interface ProductResult
    extends Omit<
        Product,
        "topLevelCategory" | "secondLevelCategory" | "thirdLevelCategory"
    > {
    topLevelCategory: Category;
    secondLevelCategory: Category;
    thirdLevelCategory: Category;
}

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
            providesTags: (data) =>
                data
                    ? data.result.map((product) => ({
                          type: "Products",
                          id: product._id,
                      }))
                    : [{ type: "Products", id: "LIST" }],
        }),

        getProductFilters: builder.query<
            ApiResponseObject<ProductFilters>,
            string
        >({
            query: (cat) => {
                return {
                    url: "/products/filters",
                    method: "GET",
                    params: { category: cat },
                };
            },
        }),

        getRandomProduct: builder.query<ApiResponseArray<Product>, void>({
            query: () => ({
                url: "/products?random=true",
                method: "GET",
            }),
        }),

        getProductById: builder.query<ApiResponseObject<ProductResult>, string>(
            {
                query: (id) => ({
                    url: `/products/id/${id}`,
                    method: "GET",
                    params: {
                        populate:
                            "topLevelCategory secondLevelCategory thirdLevelCategory",
                    },
                }),
                providesTags: (result, error, id) => [
                    { type: "Products", id: id },
                ],
            }
        ),
    }),
});

export const {
    useLazyGetAllProductsQuery,
    useGetAllProductsQuery,
    useGetProductByIdQuery,
    useGetProductFiltersQuery,
    useGetRandomProductQuery,
} = productApi;
