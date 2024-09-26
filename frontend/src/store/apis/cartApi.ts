import { apiSlice } from "./apiSlice";
import type { Cart } from "@/types/Cart";

interface BodyProps {
    action: "add" | "delete";
    productId: string;
    color: string;
    size: string;
    unitPrice: number;
    quantity: number;
    _id: string;
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

        editUsersCart: builder.mutation<Cart, BodyProps>({
            query: (cart) => ({
                url: "/cart",
                method: "PATCH",
                body: cart,
            }),
            invalidatesTags: (result, error, cart) => [
                { type: "Cart", id: cart._id },
            ],
        }),
    }),
});

export const { useGetUsersCartQuery, useEditUsersCartMutation } = cartApi;
