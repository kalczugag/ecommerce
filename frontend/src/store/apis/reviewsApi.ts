import { Review } from "@/types/Review";
import { apiSlice } from "./apiSlice";

export const reviewsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviewsByProductId: builder.query<ApiResponseObject<Review>, string>(
            {
                query: (id) => ({
                    url: `/reviews/${id}`,
                    method: "GET",
                }),
            }
        ),

        addReview: builder.mutation<ApiResponseObject<Review>, Review>({
            query: (values) => ({
                url: "/reviews",
                method: "POST",
                body: values,
            }),
        }),
    }),
});

export const { useGetReviewsByProductIdQuery, useAddReviewMutation } =
    reviewsApi;
