import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import {
    useLazyGetFeaturedCampaignQuery,
    useUpdateWishlistMutation,
} from "@/store";
import { CircularProgress } from "@mui/material";
import InfiniteCarousel from "@/components/InfiniteCarousel";
import ProductCard from "@/components/ProductCard";

interface CampaignsListProps {
    isToken: boolean;
}

const CampaignsList = ({ isToken }: CampaignsListProps) => {
    const { ref, inView } = useInView();
    const { token } = useAuth();
    const [wishlist, setWishlist] = useState<string[]>(() => {
        const stored = localStorage.getItem("wishlist");
        return stored ? JSON.parse(stored) : [];
    });

    const [triggerFetch] = useLazyGetFeaturedCampaignQuery();
    const [updateWishlist] = useUpdateWishlistMutation();

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

    const handleWishlist = (productId: string, action: "add" | "remove") => {
        if (!data || !productId) return;

        if (token) {
            updateWishlist({ productId, type: action });
        }

        setWishlist((prevWishlist) => {
            let updated: string[];

            if (action === "add" && !prevWishlist.includes(productId)) {
                updated = [...prevWishlist, productId];
            } else if (action === "remove") {
                updated = prevWishlist.filter((id) => id !== productId);
            } else {
                updated = prevWishlist;
            }

            localStorage.setItem("wishlist", JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (productId: string) => wishlist.includes(productId);

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    return (
        <div className="space-y-12">
            {data?.pages.map((page) =>
                page?.result.map((campaign) => {
                    if (campaign.hidden) return;

                    const products = campaign?.products.map((product) => (
                        <ProductCard
                            key={product._id}
                            data={product}
                            variant="highlighted"
                            isLoading={isFetching}
                            isFavorite={isFavorite}
                            onWishlistTrigger={handleWishlist}
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
            <div ref={ref} className="flex justify-center">
                {isFetching && <CircularProgress sx={{ mt: 4 }} />}
            </div>
        </div>
    );
};

export default CampaignsList;
