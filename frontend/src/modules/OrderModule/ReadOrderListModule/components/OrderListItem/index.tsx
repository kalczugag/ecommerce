import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-business-days";
import { Button, Divider } from "@mui/material";
import SummaryCard from "../SummaryCard";
import OrderListItemSkeleton from "./OrderListItemSkeleton";
import type { Order } from "@/types/Order";
import type { DeliveryMethod } from "@/types/DeliveryMethod";
import { deliveryMethods } from "@/constants/deliveryMethods";

interface OrderListItemProps {
    data?: Order;
    isLoading: boolean;
}

const OrderListItem = ({ data, isLoading }: OrderListItemProps) => {
    const navigate = useNavigate();

    const deliveryMethod = data?.shipments[0]
        ?._deliveryMethod as DeliveryMethod;

    const expectedDeliveryDate = deliveryMethod?.providers?.[0]
        ? moment(data?.createdAt)
              .businessAdd(
                  deliveryMethod.providers[0].estimatedDeliveryTimeMin || 1,
                  "days"
              )
              .format("dd, DD.MM.YYYY")
        : "N/A";

    return (
        <>
            {isLoading ? (
                <OrderListItemSkeleton />
            ) : (
                <div className="flex flex-col space-y-4">
                    <div className="flex flex-col space-y-2 justify-between md:space-y-0 md:items-center md:flex-row">
                        <h1 className="font-semibold text-2xl break-words">
                            Order number: {data?.orderNumber}
                        </h1>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(`/account/orders/${data?._id}`)
                            }
                        >
                            View
                        </Button>
                    </div>

                    <Divider />

                    <div className="space-y-10">
                        <div className="flex flex-row space-x-8">
                            <SummaryCard
                                label="Order date"
                                value={moment(data?.createdAt).format(
                                    "dd, DD.MM.YYYY"
                                )}
                                isLoading={isLoading}
                            />
                            <SummaryCard
                                label="Total cost"
                                value={`$${data?.total.toFixed(2)}`}
                                isLoading={isLoading}
                            />
                            <SummaryCard
                                label="Status"
                                value={data?.status || ""}
                                isLoading={isLoading}
                            />
                        </div>
                        <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                            <SummaryCard
                                label="Expected delivery"
                                value={expectedDeliveryDate}
                                isLoading={isLoading}
                                width={150}
                            />
                            <div className="flex space-x-4">
                                {(data!.items.length > 1
                                    ? data!.items.slice(0, 2)
                                    : data!.items
                                ).map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col space-y-1 text-gray-800"
                                    >
                                        {index === 1 &&
                                        data!.items.length > 2 ? (
                                            <div className="relative max-w-[150px] sm:max-w-[180px] md:max-w-[220px]">
                                                <img
                                                    src={`${item._product.imageUrl[0]}?imwidth=220`}
                                                    loading="lazy"
                                                    className="max-w-full object-cover object-top opacity-50 md:object-center"
                                                    alt={item._product.title}
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-white text-lg font-semibold">
                                                    +{data!.items.length - 1}
                                                </div>
                                            </div>
                                        ) : (
                                            <Link
                                                to={`/product/${item._product._id}`}
                                                className="max-w-[150px] sm:max-w-[180px] md:max-w-[220px]"
                                            >
                                                <img
                                                    src={`${item._product.imageUrl[0]}?imwidth=220`}
                                                    loading="lazy"
                                                    className="max-w-full object-cover object-top md:object-center"
                                                    alt={item._product.title}
                                                />
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderListItem;
