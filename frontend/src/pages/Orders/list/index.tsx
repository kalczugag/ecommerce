import { useCallback, useEffect, useState } from "react";
import { useGetOrdersByUserIdQuery } from "@/store";
import useAuth from "@/hooks/useAuth";
import { useTitle } from "@/hooks/useTitle";
import ReadOrderListModule from "@/modules/OrderModule/ReadOrderListModule";
import type { Order } from "@/types/Order";

const OrdersList = () => {
    const { userId } = useAuth();
    useTitle("Orders - List");

    const [page, setPage] = useState(1);
    const [allOrders, setAllOrders] = useState<Order[]>([]);

    const { data, isLoading, isFetching } = useGetOrdersByUserIdQuery(
        {
            userId: userId || "",
            params: { page, pageSize: 2 },
        },
        { skip: !userId }
    );

    useEffect(() => {
        if (data?.data) {
            setAllOrders((prev) => [...prev, ...data.data]);
        }
    }, [data]);

    const loadMoreOrders = useCallback(() => {
        if (!isLoading && !isFetching && data?.data?.length) {
            setPage((prev) => prev + 1);
        }
    }, [isLoading, isFetching, data]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
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
    }, [loadMoreOrders]);

    return (
        <>
            <ReadOrderListModule data={allOrders} isLoading={isLoading} />
            <div id="loadMoreTrigger" style={{ height: "20px" }} />
        </>
    );
};

export default OrdersList;
