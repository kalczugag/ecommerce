import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLazyGetAllProductsQuery } from "@/store";
import ProductCard from "@/components/ProductCard";

interface ProductsListProps {
    category: string;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsList = ({ category, setIsFetching }: ProductsListProps) => {
    const { ref, inView } = useInView({
        threshold: 0,
        rootMargin: "200px",
    });
    const [searchParams] = useSearchParams();
    const [triggerFetch] = useLazyGetAllProductsQuery();

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

    useEffect(() => {
        if (inView) {
            fetchNextPage();
        }
    }, [fetchNextPage, inView]);

    useEffect(() => {
        setIsFetching(isFetching);
    }, [isFetching]);

    return (
        <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data?.pages.map((page) =>
                page?.data.map((product) => (
                    <ProductCard
                        key={product._id}
                        data={product}
                        isLoading={isFetching}
                        size="lg"
                    />
                ))
            )}
            <div ref={ref}></div>
        </div>
    );
};

export default ProductsList;
