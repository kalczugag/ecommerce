import { apiSlice } from "./apiSlice";

type SummaryArgument = {
    isLoggedIn?: boolean;
};

export const summaryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateVisitorCount: builder.mutation<void, SummaryArgument>({
            query: ({ isLoggedIn }) => ({
                url: "/summary",
                method: "POST",
                body: isLoggedIn,
            }),
        }),
    }),
});

export const { useUpdateVisitorCountMutation } = summaryApi;
