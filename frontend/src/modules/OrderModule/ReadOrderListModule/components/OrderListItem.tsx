import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { placeholderArray } from "@/utils/helpers";
import { Button, Divider, Skeleton } from "@mui/material";
import SummaryCard from "./SummaryCard";
import type { Order } from "@/types/Order";
import { Product } from "@/types/Product";

interface OrderListItemProps {
    data?: Order;
    isLoading: boolean;
}

const OrderListItem = ({ data, isLoading }: OrderListItemProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 justify-between md:space-y-0 md:items-center md:flex-row">
                <h1 className="font-semibold text-2xl break-words">
                    {isLoading ? (
                        <Skeleton variant="text" width={150} />
                    ) : (
                        `Order number: ${data?._id}`
                    )}
                </h1>
                {isLoading ? (
                    <Skeleton variant="rectangular" width={80} height={36} />
                ) : (
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/orders/${data?._id}`)}
                    >
                        View
                    </Button>
                )}
            </div>

            <Divider />

            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    <SummaryCard
                        label="Order date"
                        value={moment(data?.createdAt).format("dd, DD.MM.YYYY")}
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        label="Total cost"
                        value={`$${data?.total}`}
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        label="Payment status"
                        value={data?.paymentStatus || ""}
                        isLoading={isLoading}
                    />
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <SummaryCard
                        label="Expected delivery"
                        value={moment(data?.createdAt)
                            .add(2, "days")
                            .format("dd, DD.MM.YYYY")}
                        isLoading={isLoading}
                        width={150}
                    />
                    <div className="flex space-x-4">
                        {(isLoading
                            ? placeholderArray(2)
                            : data!.items.length > 1
                            ? data!.items.slice(0, 2)
                            : data!.items
                        ).map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col space-y-1 text-gray-800"
                            >
                                {isLoading ? (
                                    <Skeleton
                                        variant="rectangular"
                                        width={180}
                                        height={220}
                                    />
                                ) : index === 1 && data!.items.length > 2 ? (
                                    <div className="relative max-w-[150px] sm:max-w-[180px] md:max-w-[220px]">
                                        <img
                                            src={
                                                (item.product as Product)
                                                    .imageUrl[0]
                                            }
                                            loading="lazy"
                                            className="max-w-full object-cover object-top opacity-50 md:object-center"
                                            alt={
                                                (item.product as Product).title
                                            }
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-lg font-semibold">
                                            +{data!.items.length - 1}
                                        </div>
                                    </div>
                                ) : (
                                    <Link
                                        to={`/product/${
                                            (item.product as Product)._id
                                        }`}
                                        className="max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
                                    >
                                        <img
                                            src={
                                                (item.product as Product)
                                                    .imageUrl[0]
                                            }
                                            loading="lazy"
                                            className="max-w-full object-cover object-top md:object-center"
                                            alt={
                                                (item.product as Product).title
                                            }
                                        />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderListItem;
