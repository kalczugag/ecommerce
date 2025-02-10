import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useLazyGetOrdersByUserIdQuery } from "@/store";
import OrderListItem from "../OrderListItem";

interface OrdersListProps {
    userId: string;
    status: string;
    sort: string;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdersList = ({
    userId,
    sort,
    status,
    setIsFetching,
}: OrdersListProps) => {
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

    useEffect(() => {
        setIsFetching(isFetching);
    }, [isFetching]);

    return (
        <div>
            <div className="flex flex-col w-full space-y-28">
                {data?.pages.map((page) =>
                    page?.data.map((order) => (
                        <OrderListItem
                            key={order._id}
                            data={order}
                            isLoading={isFetching}
                        />
                    ))
                )}
            </div>
            <div ref={ref}></div>
        </div>
    );
};

export default OrdersList;
