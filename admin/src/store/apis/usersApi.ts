import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/User";

export const userApi = createApi({
    reducerPath: "user",
    baseQuery: fetchBaseQuery({
        baseUrl:
            window.location.protocol +
            "//" +
            window.location.host +
            "/api" +
            "/v1",
    }),
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            providesTags: (result) =>
                result
                    ? result.map((user) => ({
                          type: "Users",
                          id: user._id,
                      }))
                    : [{ type: "Users", id: "LIST" }],
        }),

        getUsersByRole: builder.query<User[], string>({
            query: (roleName) => ({
                url: "/users",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
                params: {
                    roleName,
                },
            }),
            providesTags: (result) =>
                result
                    ? result.map((user) => ({
                          type: "Users",
                          id: user._id,
                      }))
                    : [{ type: "Users", id: "LIST" }],
        }),
    }),
});

export const { useGetAllUsersQuery, useGetUsersByRoleQuery } = userApi;
