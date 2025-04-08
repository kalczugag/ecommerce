import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLazyGetFeaturedCampaignQuery } from "@/store";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";

const options = {
    populate:
        "products.title,products.brand,products.description,products.imageUrl,products.price,products.discountPercent,products.discountedPrice",
};

interface CampaignsListProps {
    isToken: boolean;
}

const CampaignsList = ({ isToken }: CampaignsListProps) => {
    const { ref, inView } = useInView();

    const [triggerFetch] = useLazyGetFeaturedCampaignQuery();

    const fetchCampaigns = async ({ pageParam }: { pageParam: number }) => {
        const { data } = await triggerFetch(
            {
                skip: pageParam,
                limit: 2,
                populate:
                    "products.title,products.brand,products.description,products.imageUrl,products.price,products.analytics,products.discountPercent,products.discountedPrice",
            },
            true
        );
        return data;
    };

    const { data, fetchNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["Campaigns"],
        queryFn: fetchCampaigns,
        initialPageParam: 0,
        getNextPageParam: (lastPage, pages) =>
            lastPage?.hasMore ? lastPage?.nextCursor : undefined,
    });

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <div className="space-y-12">
            {data?.pages.map((page) =>
                page?.result.map((campaign) => {
                    const products = campaign?.products.map((product) => (
                        <ProductCard
                            key={product._id}
                            data={product}
                            variant="highlighted"
                            isLoading={isFetching}
                        />
                    ));

                    return (
                        <InfiniteCarousel
                            key={campaign._id}
                            name={campaign?.name}
                            description={campaign?.description}
                            content={products || []}
                            isLoading={isFetching}
                            bgColor={campaign?.bgColor}
                            textColor={campaign?.textColor}
                        />
                    );
                })
            )}
            <div ref={ref}></div>
        </div>
    );
};

export default CampaignsList;
