import { useCallback, useEffect, useState } from "react";
import { useGetOrdersByUserIdQuery } from "@/store";
import type { Order } from "@/types/Order";

export const usePaginatedOrders = (
    userId: string | null,
    limit = 2,
    status?: string,
    sort?: string
) => {
    const [page, setPage] = useState(0);
    const [allOrders, setAllOrders] = useState<Order[]>([]);
    const [hasMoreOrders, setHasMoreOrders] = useState(true);

    const { data, isLoading, isFetching } = useGetOrdersByUserIdQuery(
        {
            userId: userId || "",
            params: {
                skip: page,
                limit,
                status,
                sort,
            },
        },
        { skip: !userId }
    );

    useEffect(() => {
        setPage(0);
        setAllOrders([]);
        setHasMoreOrders(true);
    }, [status]);

    useEffect(() => {
        if (data?.data) {
            setAllOrders((prev) => {
                const newOrders = data.data.filter(
                    (order) =>
                        !prev.some((prevOrder) => prevOrder._id === order._id)
                );
                return [...prev, ...newOrders];
            });

            if (allOrders.length + data.data.length >= data.count) {
                setHasMoreOrders(false);
            }
        }
    }, [data]);

    const loadMoreOrders = useCallback(() => {
        if (hasMoreOrders && !isLoading && !isFetching && data?.data?.length) {
            setPage((prev) => prev + 1);
        }
    }, [hasMoreOrders, isLoading, isFetching, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMoreOrders) {
                    loadMoreOrders();
                }
            },
            { threshold: 1.0 }
        );

        const target = document.querySelector("#loadMoreTrigger");
        if (target) observer.observe(target);

        return () => {
            if (target) observer.unobserve(target);
        };
    }, [loadMoreOrders, hasMoreOrders]);

    return { allOrders, isLoading: isLoading || isFetching, hasMoreOrders };
};
