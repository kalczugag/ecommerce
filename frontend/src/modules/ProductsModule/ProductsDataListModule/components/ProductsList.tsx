import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import useAuth from "@/hooks/useAuth";
import { useLazyGetAllProductsQuery, useUpdateWishlistMutation } from "@/store";
import ProductCard from "@/components/ProductCard";
import { CircularProgress } from "@mui/material";

interface ProductsListProps {
    category: string;
}

const ProductsList = ({ category }: ProductsListProps) => {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",
    });
    const [wishlist, setWishlist] = useState<string[]>(() => {
        const stored = localStorage.getItem("wishlist");
        return stored ? JSON.parse(stored) : [];
    });
    const { token } = useAuth();
    const [searchParams] = useSearchParams();

    const [triggerFetch] = useLazyGetAllProductsQuery();
    const [updateWishlist] = useUpdateWishlistMutation();

    const filters = Object.fromEntries(searchParams.entries());

    const fetchProducts = async ({ pageParam }: { pageParam: number }) => {
        const { data } = await triggerFetch({
            skip: pageParam,
            limit: 8,
            category,
            ...filters,
        });
        return data;
    };

    const { data, fetchNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["Products", category, filters],
        queryFn: fetchProducts,
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
        <div className="w-full">
            <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data?.pages.map((page) =>
                    page?.result.map((product) => (
                        <ProductCard
                            key={product._id}
                            data={product}
                            isLoading={isFetching}
                            isFavorite={isFavorite}
                            onWishlistTrigger={handleWishlist}
                            size="lg"
                        />
                    ))
                )}
            </div>
            <div ref={ref} className="flex justify-center">
                {isFetching && <CircularProgress sx={{ mt: 4 }} />}
            </div>
        </div>
    );
};

export default ProductsList;
