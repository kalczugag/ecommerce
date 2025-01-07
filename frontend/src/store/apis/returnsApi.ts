import { serialize } from "@/utils/helpers";
import { apiSlice } from "./apiSlice";
import type { CreateReturnOrder, ReturnOrder } from "@/types/Returns";

export const returnsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReturnById: builder.query<ReturnOrder, string>({
            query: (id) => ({
                url: `/returns/id/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [
                { type: "ReturnOrder", id: id },
            ],
        }),

        getOrdersByUserId: builder.query<
            ApiResponseArray<ReturnOrder>,
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
                    url: `/returns/userId/${userId}`,
                    method: "GET",
                    params: queryParams,
                };
            },
        }),

        addReturn: builder.mutation<
            ApiResponseObject<ReturnOrder>,
            CreateReturnOrder
        >({
            query: (values) => ({
                url: "/returns",
                method: "POST",
                body: values,
            }),
        }),

        // updateReturn: builder.mutation<ApiResponseObject<Order>, UpdateOrder>({
        //     query: (order) => ({
        //         url: `/returns/${order._id}`,
        //         method: "PATCH",
        //         body: order,
        //     }),
        //     invalidatesTags: (result, error, values) => [
        //         { type: "ReturnOrder", id: values._id },
        //     ],
        // }),
    }),
});

export const { useGetReturnByIdQuery, useAddReturnMutation } = returnsApi;
