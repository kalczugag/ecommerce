import { apiSlice } from "./apiSlice";
import type { Order } from "@/types/Order";

export type summaryType = "yearly" | "monthly" | "weekly";
type orderSummary = {
    period: string;
    total: number;
};

export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query<ApiResponseArray<Order>, Paginate | void>({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.skip !== undefined) {
                    queryParams.skip = params.skip.toString();
                }
                if (params?.limit !== undefined) {
                    queryParams.limit = params.limit.toString();
                }
                return {
                    url: "/orders",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (result) =>
                result
                    ? result.data.map((order) => ({
                          type: "Orders",
                          id: order._id,
                      }))
                    : [{ type: "Orders", id: "LIST" }],
        }),

        getOrderById: builder.query<Order, string>({
            query: (id) => ({
                url: `/orders/id/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [{ type: "Orders", id: id }],
        }),

        getOrdersSummary: builder.query<orderSummary[], summaryType>({
            query: (type) => ({
                url: "/orders/summary",
                method: "GET",
                params: { type },
            }),
        }),
    }),
});

export const {
    useGetAllOrdersQuery,
    useGetOrderByIdQuery,
    useGetOrdersSummaryQuery,
} = orderApi;
