import { apiSlice } from "./apiSlice";
import type { User } from "@/types/User";

interface fetchArgs extends Paginate {
    roleName: string;
}

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponse<User>, Paginate | void>({
            query: (params = {}) => {
                const queryParams: Record<string, string> = {};
                if (params?.page !== undefined) {
                    queryParams.page = params.page.toString();
                }
                if (params?.pageSize !== undefined) {
                    queryParams.pageSize = params.pageSize.toString();
                }
                return {
                    url: "/users",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (result) =>
                result
                    ? result.data.map((user) => ({
                          type: "Users",
                          id: user._id,
                      }))
                    : [{ type: "Users", id: "LIST" }],
        }),

        getUsersByRole: builder.query<ApiResponse<User>, fetchArgs>({
            query: ({ roleName, page, pageSize }) => {
                const queryParams: Record<string, string> = {};
                if (page !== undefined) {
                    queryParams.page = page.toString();
                }
                if (pageSize !== undefined) {
                    queryParams.pageSize = pageSize.toString();
                }
                return {
                    url: "/users/byRole",
                    method: "GET",
                    params: { ...queryParams, roleName },
                };
            },
            providesTags: (result) =>
                result
                    ? result.data.map((user) => ({
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

        deleteUser: builder.mutation<User, string>({
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
