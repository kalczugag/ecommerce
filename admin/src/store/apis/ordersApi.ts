import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Order } from "@/types/Order";

export const orderApi = createApi({
    reducerPath: "order",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol +
            "//" +
            window.location.host +
            "/api" +
            "/v1",
    }),
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        getAllOrders: builder.query<Order[], void>({
            query: () => ({
                url: "/orders",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            }),
            providesTags: (result) =>
                result
                    ? result.map((order) => ({
                          type: "Orders",
                          id: order._id,
                      }))
                    : [{ type: "Orders", id: "LIST" }],
        }),

        getOrderById: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("token") || "",
                },
            }),
            providesTags: (result, error, id) => [{ type: "Orders", id: id }],
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = orderApi;
