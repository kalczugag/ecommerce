import { serialize } from "@/utils/helpers";
import { apiSlice } from "./apiSlice";
import type { User } from "@/types/User";

interface fetchArgs extends Paginate {
    roleName: string;
}

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query<ApiResponseArray<User>, Paginate | void>({
            query: ({ skip, limit, search, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (search !== undefined) {
                    queryParams.search = search.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/users",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (data) =>
                data
                    ? data.result.map((user) => ({
                          type: "Users",
                          id: user._id,
                      }))
                    : [{ type: "Users", id: "LIST" }],
        }),

        getUsersByRole: builder.query<ApiResponseArray<User>, fetchArgs>({
            query: ({ skip, limit, search, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, string> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                if (search !== undefined) {
                    queryParams.search = search.toString();
                }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/users/byRole",
                    method: "GET",
                    params: queryParams,
                    keepUnusedDataFor: 300,
                };
            },
            providesTags: (data) =>
                data
                    ? data.result.map((user) => ({
                          type: "Users",
                          id: user._id,
                      }))
                    : [{ type: "Users", id: "LIST" }],
        }),

        getUserById: builder.query<ApiResponseObject<User>, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "GET",
                keepUnusedDataFor: 300,
            }),
            providesTags: (result, error, id) => [{ type: "Users", id: id }],
        }),

        addUser: builder.mutation<ApiResponseObject<User>, User>({
            query: (values) => ({
                url: "/users",
                method: "POST",
                body: values,
            }),
            invalidatesTags: (result, error, values) => [
                { type: "Users", id: values._id },
            ],
        }),

        editAdminUser: builder.mutation<ApiResponseObject<User>, Partial<User>>(
            {
                query: (values) => ({
                    url: `/admin/users/${values._id}`,
                    method: "PATCH",
                    body: values,
                }),
                invalidatesTags: (result, error, values) => [
                    { type: "Users", id: values._id },
                    { type: "Users", id: "LIST" },
                ],
            }
        ),

        editUser: builder.mutation<ApiResponseObject<User>, Partial<User>>({
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

        deleteUser: builder.mutation<ApiResponseObject<User>, string>({
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
    useAddUserMutation,
    useEditUserMutation,
    useEditAdminUserMutation,
    useDeleteUserMutation,
} = userApi;
