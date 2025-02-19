import { apiSlice } from "./apiSlice";
import type { Item } from "@/types/Order";

export const baseItemsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useEditBaseItemMutation } = baseItemsApi;
