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
        getUsersCart: builder.query<Cart, void>({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: (result) =>
                result ? [{ type: "Cart", id: result._id }] : [],
        }),

        getUsersCartCount: builder.query<
            { _id: string; count: number },
            { onlyCount?: boolean }
        >({
            query: (onlyCount) => ({
                url: "/cart",
                method: "GET",
                params: onlyCount,
            }),
            providesTags: (result) =>
                result ? [{ type: "Cart", id: result._id }] : [],
        }),

        editUsersCart: builder.mutation<ApiResponseObject<Cart>, BodyProps>({
            query: (cart) => ({
                url: `/cart/${cart.cartId}`,
                method: "PATCH",
                body: cart,
            }),
            invalidatesTags: (result, error, cart) => [
                { type: "Cart", id: result?.data._id },
            ],
        }),
    }),
});

export const {
    useGetUsersCartQuery,
    useGetUsersCartCountQuery,
    useEditUsersCartMutation,
} = cartApi;
