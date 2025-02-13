import { apiSlice } from "./apiSlice";
import type { Role } from "@/types/Role";

export const rolesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<ApiResponseArray<Role>, void>({
            query: () => ({
                url: "/roles",
                method: "GET",
            }),
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi;
