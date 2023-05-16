import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
    fetchOrders,
    addOrder,
    editOrder,
    changeOrderSearchTerm,
} from "../store";
import { useThunk } from "../hooks/use-thunk";
import { faker } from "@faker-js/faker";
import { GoPlus } from "react-icons/go";
import SortableTable from "../componenets/SortableTable";
import Button from "../componenets/Button";
import SearchBar from "../componenets/SearchBar";

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(10);
    const [doFetchOrders] = useThunk(fetchOrders);
    const [doAddOrder] = useThunk(addOrder);
    const [doEditOrder] = useThunk(editOrder);

    const { orders } = useSelector(({ orders: { data, searchTerm } }) => {
        const filteredOrders = data.filter((order) =>
            order.item.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            orders: filteredOrders,
        };
    });
    const totalOrders = orders.length;
    const lastOrderIndex = currentPage * ordersPerPage;
    const firstOrderIndex = lastOrderIndex - ordersPerPage;
    const currentOrders = orders.slice(firstOrderIndex, lastOrderIndex);

    useEffect(() => {
        doFetchOrders();
    }, [doFetchOrders]);

    const config = [
        {
            label: "Id",
            render: (order) => order.id,
        },
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
            sortValue: (order) => order.status,
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

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(totalOrders / ordersPerPage);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const keyFn = (data) => {
        return data.id;
    };

    return (
        <div className="container px-4">
            <div className="hidden mr-10 mb-4">
                {/* in use flex^ */}
                <Button onClick={handleAddOrder}>
                    <GoPlus />
                </Button>
            </div>
            <div>
                <SearchBar
                    type="text"
                    placeholder="Search by Item"
                    search={changeOrderSearchTerm}
                    what={"orders"}
                />
            </div>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <SortableTable
                    data={currentOrders}
                    config={config}
                    keyFn={keyFn}
                    handleStatusChange={handleStatusChange}
                />
            </div>
            <div className="flex justify-center mt-4">
                {pageNumbers.map((pageNumber) => (
                    <Button
                        key={pageNumber}
                        className={`mx-1 px-3 py-1 rounded ${
                            currentPage === pageNumber
                                ? "bg-blue-500 text-white"
                                : ""
                        }`}
                        onClick={() => paginate(pageNumber)}
                    >
                        {pageNumber}
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default Orders;
