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

        getOrdersByUserId: builder.query<
            ApiResponseArray<Order>,
            { userId: string; params?: Paginate }
        >({
            query: ({ userId, params = {} }) => {
                const queryParams: Record<string, string> = {};
                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
                }
                return {
                    url: `/orders/userId/${userId}`,
                    method: "GET",
                    params: queryParams,
                };
            },
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
