import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchOrders, addOrder, editOrder } from "../store";
import { useThunk } from "../hooks/use-thunk";
import SortableTable from "../componenets/SortableTable";
import Button from "../componenets/Button";
import { GoPlus } from "react-icons/go";
import { faker } from "@faker-js/faker";

const Orders = () => {
    const [doFetchOrders] = useThunk(fetchOrders);
    const [doAddOrder, AddLoading] = useThunk(addOrder);
    const [doEditOrder] = useThunk(editOrder);
    const data = useSelector((state) => state.orders.data) || [];

    useEffect(() => {
        doFetchOrders();
    }, [doFetchOrders]);

    const config = [
        {
            label: "Item",
            render: (order) => order.item,
        },
        {
            label: "ItemId",
            render: (order) => order.itemId,
        },
        {
            label: "Price",
            render: (order) => `$${order.price}`,
            sortValue: (order) => order.price,
        },
        {
            label: "Done",
            render: (order) => (
                <input
                    type="checkbox"
                    checked={order.status}
                    onChange={() => handleStatusChange(order)}
                />
            ),
        },
    ];

    const handleStatusChange = (order) => {
        doEditOrder({ ...order, status: !order.status });
    };

    const handleAddOrder = () => {
        doAddOrder({
            item: faker.commerce.product(),
            itemId: Math.round(Math.random() * 10),
            price: faker.commerce.price(),
            status: false,
        });
    };

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-end mr-10">
                <Button onClick={handleAddOrder} loading={AddLoading}>
                    <GoPlus />
                </Button>
            </div>
            <SortableTable config={config} data={data} keyFn={keyFn} />
        </div>
    );
};

export default Orders;
