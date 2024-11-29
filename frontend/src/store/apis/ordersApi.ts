import { serialize } from "@/utils/helpers";
import { apiSlice } from "./apiSlice";
import type { Order, UpdateOrder } from "@/types/Order";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderById: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders/id/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Orders", id: id }],
        }),

        getOrdersByUserId: builder.query<
            ApiResponseArray<Order>,
            { userId: string; params?: Paginate }
        >({
            query: ({
                userId,
                params = {},
            }: {
                userId: string;
                params?: Paginate;
            }) => {
                const { skip, limit, ...rest } = params;

                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
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
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: values._id },
            ],
        }),
    }),
});

export const {
    useGetOrderByIdQuery,
    useGetOrdersByUserIdQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
} = ordersApi;
