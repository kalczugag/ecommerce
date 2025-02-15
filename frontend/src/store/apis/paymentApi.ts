import { apiSlice } from "./apiSlice";
import type { Order } from "@/types/Order";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<ApiResponseObject<string>, Order>({
            query: (order) => ({
                url: "/checkout",
                method: "POST",
                body: order,
            }),
        }),
    }),
});

export const { useCreatePaymentMutation } = paymentApi;
