import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { Order } from "@/types/Order";

export type summaryType = "yearly" | "monthly" | "weekly";
type orderSummary = {
    period: string;
    total: number;
};

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query<ApiResponseArray<Order>, Paginate | void>({
            query: ({ skip, limit, search, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (search !== undefined) {
                    queryParams.search = search.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/admin/orders",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (data) =>
                data
                    ? data.result.map((order) => ({
                          type: "Orders",
                          id: order._id,
                      }))
                    : [{ type: "Orders", id: "LIST" }],
        }),

        getOrderById: builder.query<ApiResponseObject<Order>, string>({
            query: (id) => ({
                url: `/orders/id/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [
                { type: "Orders", id: id },
                { type: "Orders", id: "GLOBAL" },
            ],
        }),

        getOrdersSummary: builder.query<
            ApiResponseArray<orderSummary>,
            summaryType
        >({
            query: (type) => ({
                url: "/admin/orders/summary",
                method: "GET",
                params: { type },
            }),
        }),

        editOrder: builder.mutation<ApiResponseObject<Order>, Partial<Order>>({
            query: (order) => ({
                url: `/admin/orders/${order._id}`,
                method: "PATCH",
                body: order,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: values._id },
            ],
        }),

        deleteOrderItem: builder.mutation<
            ApiResponseObject<Order>,
            { orderId: string; itemId: string }
        >({
            query: (order) => ({
                url: `/admin/orders/${order.orderId}/item/${order.itemId}`,
                method: "PATCH",
                body: order,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: values.orderId },
            ],
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useGetOrdersSummaryQuery,
    useEditOrderMutation,
    useDeleteOrderItemMutation,
} = orderApi;
