import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Product } from "@/types/Product";

// interface GetProductsParams {
//     page?: number;
//     pageSize?: number;
// }

// interface ResultProducts {
//     data: Product[];
//     totalDepartmentsCount: number;
// }

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
    }),
});

export const { useGetAllProductsQuery } = productApi;
