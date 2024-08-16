import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { User } from "@/types/User";

interface ResultUserById {
    msg: string;
    data: User;
}

export const userApi = createApi({
    reducerPath: "users",
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
                url: "/users/byRole",
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

        getUserById: builder.query<User[], string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            providesTags: (result, error, id) => [{ type: "Users", id: id }],
        }),

        editUser: builder.mutation<ResultUserById, User>({
            query: (values) => ({
                url: `/users/${values._id}`,
                method: "PATCH",
                body: values,
                headers: {
                    Authorization: localStorage.getItem("authToken") || "",
                },
            }),
            invalidatesTags: (result) => [
                { type: "Users", id: result?.data._id },
                { type: "Users", id: "LIST" },
            ],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUsersByRoleQuery,
    useGetUserByIdQuery,
    useEditUserMutation,
} = userApi;

export type { ResultUserById };
