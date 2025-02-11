import { apiSlice } from "./apiSlice";
import type { Order, Shipment } from "@/types/Order";

export const shipmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editShipment: builder.mutation<
            ApiResponseObject<Order>,
            Partial<Shipment>
        >({
            query: (values) => ({
                url: `/admin/shipments/${values._id}`,
                method: "PATCH",
                body: values,
            }),
        }),
    }),
});

export const { useEditShipmentMutation } = shipmentsApi;
