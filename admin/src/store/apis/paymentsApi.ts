import { apiSlice } from "./apiSlice";
import type { Payment } from "@/types/Order";

export const paymentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editPayment: builder.mutation<
            ApiResponseObject<Payment>,
            Partial<Payment>
        >({
            query: (payment) => ({
                url: `/admin/payments/${payment._id}`,
                method: "PATCH",
                body: payment,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Payments", id: values._id },
                { type: "Orders", id: "GLOBAL" },
            ],
        }),

        deletePayment: builder.mutation<ApiResponseObject<Payment>, string>({
            query: (id) => ({
                url: `/admin/payments/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "Payments", id: id },
                { type: "Orders", id: "GLOBAL" },
            ],
        }),
    }),
});

export const { useEditPaymentMutation, useDeletePaymentMutation } = paymentsApi;
