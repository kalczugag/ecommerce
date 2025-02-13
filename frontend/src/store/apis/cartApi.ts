import { apiSlice } from "./apiSlice";
import type { Cart } from "@/types/Cart";

interface BodyProps {
    action: "add" | "delete" | "changeQuantity";
    cartId?: string;
    _product?: string;
    color?: string;
    size?: string;
    unitPrice?: number;
    quantity?: number;
    _id?: string;
}

export const cartApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsersCart: builder.query<ApiResponseObject<Cart>, void>({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: (data) =>
                data ? [{ type: "Cart", id: data.result._id }] : [],
        }),

        getUsersCartCount: builder.query<
            ApiResponseObject<{ _id: string; count: number }>,
            { onlyCount?: boolean }
        >({
            query: (onlyCount) => ({
                url: "/cart",
                method: "GET",
                params: onlyCount,
            }),
            providesTags: (data) =>
                data ? [{ type: "Cart", id: data.result._id }] : [],
        }),

        editUsersCart: builder.mutation<ApiResponseObject<Cart>, BodyProps>({
            query: (cart) => ({
                url: `/cart/${cart.cartId}`,
                method: "PATCH",
                body: cart,
            }),
            invalidatesTags: (data, error, cart) => [
                { type: "Cart", id: data?.result._id },
            ],
        }),
    }),
});

export const {
    useGetUsersCartQuery,
    useGetUsersCartCountQuery,
    useEditUsersCartMutation,
} = cartApi;
