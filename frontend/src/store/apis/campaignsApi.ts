import { apiSlice } from "./apiSlice";
import { serialize } from "@/utils/helpers";
import type { FeaturedCampaign } from "@/types/FeaturedCampaign";

export const campaignsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getFeaturedCampaign: builder.query<
            ApiResponseArray<FeaturedCampaign>,
            Paginate | void
        >({
            query: ({ skip, limit, ...rest }: Paginate = {}) => {
                let queryParams: Record<string, any> = {};

                if (skip !== undefined) {
                    queryParams.skip = skip.toString();
                }
                if (limit !== undefined) {
                    queryParams.limit = limit.toString();
                }
                // if (populate !== undefined) {
                //     queryParams.populate = populate.toString();
                // }
                if (Object.entries(rest).length > 0) {
                    queryParams = { ...queryParams, ...serialize(rest) };
                }

                return {
                    url: "/campaigns",
                    method: "GET",
                    params: queryParams,
                };
            },
        }),
    }),
});

export const { useGetFeaturedCampaignQuery, useLazyGetFeaturedCampaignQuery } =
    campaignsApi;
