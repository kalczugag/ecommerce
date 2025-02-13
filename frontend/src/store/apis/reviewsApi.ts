import { apiSlice } from "./apiSlice";
import type { ShortReviewsCount } from "@/types/Review";

export const reviewsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsByProductId: builder.query<
            ApiResponseObject<ShortReviewsCount>,
            string
        >({
            query: (id) => ({
                url: `/reviews/${id}`,
                method: "GET",
            }),
        }),
    }),
});

export const { useGetReviewsByProductIdQuery } = reviewsApi;
