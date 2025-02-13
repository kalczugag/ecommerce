import { apiSlice } from "./apiSlice";
import type { DeliveryMethod } from "@/types/DeliveryMethod";

export const deliveryMethodsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDeliveryMethods: builder.query<
            ApiResponseArray<DeliveryMethod>,
            void
        >({
            query: () => ({
                url: "/deliveryMethods",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetDeliveryMethodsQuery } = deliveryMethodsApi;
