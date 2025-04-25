import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLazyGetOrdersByUserIdQuery } from "@/store";
import OrderListItem from "../OrderListItem";
import { CircularProgress } from "@mui/material";

interface OrdersListProps {
    userId: string;
    status: string;
    sort: string;
}

const OrdersList = ({ userId, sort, status }: OrdersListProps) => {
    const { ref, inView } = useInView();

    const [triggerFetch] = useLazyGetOrdersByUserIdQuery();

    const fetchOrders = async ({ pageParam }: { pageParam: number }) => {
        const { data } = await triggerFetch(
            {
                userId,
                params: {
                    skip: pageParam,
                    limit: 4,
                    sort,
                },
            },
            !userId
        );
        return data;
    };

    const { data, fetchNextPage, isFetching } = useInfiniteQuery({
        queryKey: ["Orders", status],
        queryFn: fetchOrders,
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
        <div className="w-full">
            <div className="flex flex-col w-full space-y-28">
                {data?.pages.map((page) =>
                    page?.result.map((order) => (
                        <OrderListItem
                            key={order._id}
                            data={order}
                            isLoading={isFetching}
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

export default OrdersList;
