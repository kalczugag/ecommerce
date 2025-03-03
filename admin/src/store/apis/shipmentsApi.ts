import { apiSlice } from "./apiSlice";
import type { Order, Shipment } from "@/types/Order";

export const shipmentsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getShipmentById: builder.query<ApiResponseObject<Shipment>, string>({
            query: (id) => ({
                url: `/admin/shipments/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [
                { type: "Shipments", id: id },
            ],
        }),

        editShipment: builder.mutation<
            ApiResponseObject<Order>,
            Partial<Shipment>
        >({
            query: (values) => ({
                url: `/admin/shipments/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: "GLOBAL" },
                { type: "Shipments", id: values._id },
            ],
        }),
    }),
});

export const {
    useGetShipmentByIdQuery,
    useLazyGetShipmentByIdQuery,
    useEditShipmentMutation,
} = shipmentsApi;
