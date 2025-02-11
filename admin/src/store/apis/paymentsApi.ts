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
            // invalidatesTags: (result, error, values) => [
            //     { type: "Payments", id: values._id },
            // ],
        }),
    }),
});

export const { useEditPaymentMutation } = paymentsApi;
