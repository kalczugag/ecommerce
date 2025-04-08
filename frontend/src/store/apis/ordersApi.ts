import { serialize } from "@/utils/helpers";
import { apiSlice } from "./apiSlice";
import type { Order, UpdateOrder, AddOrder } from "@/types/Order";

export const ordersApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getOrderById: builder.query<ApiResponseObject<Order>, string>({
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
                const { skip, limit, status, sort, ...rest } = params;

                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (status !== undefined) {
                    queryParams.status = status;
                }
                if (sort !== undefined) {
                    queryParams.sort = sort;
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

        addOrder: builder.mutation<ApiResponseObject<Order>, AddOrder>({
            query: (values) => ({
                url: "/orders",
                method: "POST",
                body: values,
            }),
        }),

        deleteOrder: builder.mutation<ApiResponseObject<Order>, string>({
            query: (id) => ({
                url: `/orders/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Orders", id: id },
            ],
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
    useLazyGetOrdersByUserIdQuery,
    useGetOrdersByUserIdQuery,
    useAddOrderMutation,
    useDeleteOrderMutation,
    useUpdateOrderMutation,
} = ordersApi;
