import { apiSlice } from "./apiSlice";
import type { Order } from "@/types/Order";
import type { User } from "@/types/User";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderById: builder.query<User, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "GET",
            }),
        }),

        addOrder: builder.mutation<Order, Order>({
            query: (values) => ({
                url: "/orders",
                method: "POST",
                body: values,
            }),
        }),
    }),
});

export const { useGetOrderByIdQuery, useAddOrderMutation } = ordersApi;
