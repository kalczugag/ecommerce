import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Divider } from "@mui/material";
import type { Order } from "@/types/Order";
import { Product } from "@/types/Product";

interface OrderListItemProps {
    data: Order;
}

const OrderListItem = ({ data }: OrderListItemProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
                <p className="font-semibold text-2xl">
                    Order number: {data._id}
                </p>
                <Button onClick={() => navigate(`/orders/${data._id}`)}>
                    View
                </Button>
            </div>
            <Divider />
            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    <div className="flex flex-col">
                        <p className="font-bold">Order date</p>
                        <p>{moment(data.createdAt).format("dd, DD.MM.YYYY")}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold">Total cost</p>
                        <p>${data.total}</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold">Payment status</p>
                        <p>{data.paymentStatus}</p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <div className="flex flex-col">
                        <p className="font-bold">Expected delivery</p>
                        <p>
                            {moment(data.createdAt)
                                .add(2, "days")
                                .format("dd, DD.MM.YYYY")}
                        </p>
                    </div>
                    {(data.items.length > 1
                        ? data.items.slice(0, 2)
                        : data.items
                    ).map((item) => (
                        <Link
                            to={`/product/${(item.product as Product)._id}`}
                            className="flex flex-col space-y-1 text-gray-800"
                        >
                            <img
                                src={
                                    (item.product as Product).imageUrl[0] || ""
                                }
                                className="max-w-48 object-cover object-top md:object-center md:max-h-64 md:max-w-full"
                                onClick={() =>
                                    navigate(
                                        `/product/${
                                            (item.product as Product)._id
                                        }`
                                    )
                                }
                                alt={(item.product as Product).title}
                            />
                            <p className="font-bold">
                                {(item.product as Product).brand}
                            </p>
                            <p className="text-sm">Size: {item.size}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderListItem;
