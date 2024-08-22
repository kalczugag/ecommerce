import { apiSlice } from "./apiSlice";
import type { User } from "@/types/User";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], void>({
            query: () => ({
                url: "/users",
                method: "GET",
                keepUnusedDataFor: 300,
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
                keepUnusedDataFor: 300,
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

        getUserById: builder.query<User, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [{ type: "Users", id: id }],
        }),

        editUser: builder.mutation<User, User>({
            query: (values) => ({
                url: `/users/${values._id}`,
                method: "PATCH",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Users", id: values._id },
                { type: "Users", id: "LIST" },
            ],
        }),

        deleteUser: builder.mutation<string, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Users", id: id }],
        }),
    }),
});

export const {
    useGetAllUsersQuery,
    useGetUsersByRoleQuery,
    useGetUserByIdQuery,
    useEditUserMutation,
    useDeleteUserMutation,
} = userApi;
