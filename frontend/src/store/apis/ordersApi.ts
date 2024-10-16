import { apiSlice } from "./apiSlice";
import type { Order } from "@/types/Order";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderById: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders/id/${id}`,
                method: "GET",
            }),
        }),

        addOrder: builder.mutation<ApiResponseObject<Order>, Order>({
            query: (values) => ({
                url: "/orders",
                method: "POST",
                body: values,
            }),
        }),
    }),
});

export const { useGetOrderByIdQuery, useAddOrderMutation } = ordersApi;
