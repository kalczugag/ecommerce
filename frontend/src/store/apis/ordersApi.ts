import { apiSlice } from "./apiSlice";
import type { Order, UpdateOrder } from "@/types/Order";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderById: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders/id/${id}`,
                method: "GET",
            }),
        }),

        getOrdersByUserId: builder.query<ApiResponseArray<Order>, string>({
            query: (id) => ({
                url: `/orders/userId/${id}`,
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

        updateOrder: builder.mutation<ApiResponseObject<Order>, UpdateOrder>({
            query: (order) => ({
                url: `/orders/${order._id}`,
                method: "PATCH",
                body: order,
            }),
        }),
    }),
});

export const {
    useGetOrderByIdQuery,
    useGetOrdersByUserIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
} = ordersApi;
