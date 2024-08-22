import { apiSlice } from "./apiSlice";
import type { Order } from "@/types/Order";

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query<Order[], void>({
            query: () => ({
                url: "/orders",
                method: "GET",
                keepUnusedDataFor: 300,
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
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [{ type: "Orders", id: id }],
        }),
    }),
});

export const { useGetAllOrdersQuery, useGetOrderByIdQuery } = orderApi;
