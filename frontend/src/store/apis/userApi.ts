import { apiSlice } from "./apiSlice";
import type { User } from "@/types/User";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentUser: builder.query<User, void>({
            query: () => ({
                url: "/auth/current_user",
                method: "GET",
            }),
            keepUnusedDataFor: 300,
        }),
    }),
});

export const { useGetCurrentUserQuery } = userApi;
