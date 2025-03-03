import { apiSlice } from "./apiSlice";
import type { Item, AddItem } from "@/types/Order";

export const baseItemsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addBaseItem: builder.mutation<ApiResponseObject<void>, AddItem>({
            query: (values) => ({
                url: "/admin/items",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: "GLOBAL" },
            ],
        }),

        editBaseItem: builder.mutation<ApiResponseObject<void>, Partial<Item>>({
            query: (values) => ({
                url: `/admin/items/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: "GLOBAL" },
            ],
        }),

        deleteBaseItem: builder.mutation<
            ApiResponseObject<void>,
            { itemId: string; orderId: string }
        >({
            query: ({ itemId, orderId }) => ({
                url: `/admin/items/${itemId}`,
                method: "DELETE",
                body: { orderId },
            }),

            invalidatesTags: (result, error, values) => [
                { type: "Orders", id: "GLOBAL" },
            ],
        }),
    }),
});

export const {
    useEditBaseItemMutation,
    useDeleteBaseItemMutation,
    useAddBaseItemMutation,
} = baseItemsApi;
