import { apiSlice } from "./apiSlice";

export const paymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<
            ApiResponseObject<{ clientSecret: string }>,
            { orderId: string }
        >({
            query: (values) => ({
                url: "/checkout",
                method: "POST",
                body: values,
            }),
        }),
    }),
});

export const { useCreatePaymentMutation } = paymentApi;
