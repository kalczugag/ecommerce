import { apiSlice } from "./apiSlice";
import type { User, UpdateUser } from "@/types/User";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: "/auth/current_user",
                method: "GET",
            }),
            keepUnusedDataFor: 300,
        }),

        updateUser: builder.mutation<User, UpdateUser>({
            query: (values) => ({
                url: `/users/${values._id}`,
                method: "PATCH",
                body: values,
            }),
        }),
    }),
});

export const { useGetCurrentUserQuery, useUpdateUserMutation } = userApi;
