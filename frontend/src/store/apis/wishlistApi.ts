import { Wishlist } from "@/types/Wishlist";
import { apiSlice } from "./apiSlice";

export const wishlistApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWishlist: builder.query<ApiResponseObject<Wishlist>, void>({
            query: () => ({
                url: "/wishlist",
                method: "GET",
            }),

            providesTags: (data) => [
                { type: "Wishlist", id: data?.result._id },
            ],
            keepUnusedDataFor: 300,
        }),

        updateWishlist: builder.mutation<
            ApiResponseObject<{ _id: string }>,
            { productId: string; type: "add" | "remove" }
        >({
            query: (values) => ({
                url: "/wishlist",
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (data) => [
                { type: "Wishlist", id: data?.result._id },
            ],
        }),
    }),
});

export const { useGetWishlistQuery, useUpdateWishlistMutation } = wishlistApi;
