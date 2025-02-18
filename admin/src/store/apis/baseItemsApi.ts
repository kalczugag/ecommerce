import { apiSlice } from "./apiSlice";
import type { Item } from "@/types/Order";

export const baseItemsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        editShipment: builder.mutation<ApiResponseObject<void>, Partial<Item>>({
            query: (values) => ({
                url: `/admin/items/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: "GLOBAL" },
            ],
        }),
    }),
});

export const { useEditShipmentMutation } = baseItemsApi;
