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
