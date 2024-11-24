import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { placeholderArray } from "@/utils/helpers";
import { Button, Divider, Skeleton } from "@mui/material";
import type { Order } from "@/types/Order";
import { Product } from "@/types/Product";

interface OrderDetailsProps {
    data?: Order;
    isLoading: boolean;
}

const OrderDetails = ({ data, isLoading }: OrderDetailsProps) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col space-y-4">
            <div className="flex flex-row items-center justify-between">
                <p className="font-semibold text-2xl">
                    {isLoading ? (
                        <Skeleton variant="text" width={150} />
                    ) : (
                        `Order number: ${data?._id}`
                    )}
                </p>
                {/* place for button */}
            </div>
            <Divider />
            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    <div className="flex flex-col">
                        {isLoading ? (
                            <Skeleton variant="text" width={100} />
                        ) : (
                            <p className="font-bold">Order date</p>
                        )}
                        <p>
                            {isLoading ? (
                                <Skeleton variant="text" width={100} />
                            ) : (
                                moment(data?.createdAt).format("dd, DD.MM.YYYY")
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {isLoading ? (
                            <Skeleton variant="text" width={100} />
                        ) : (
                            <p className="font-bold">Total cost</p>
                        )}
                        <p>
                            {isLoading ? (
                                <Skeleton variant="text" width={60} />
                            ) : (
                                `$${data?.total}`
                            )}
                        </p>
                    </div>
                    <div className="flex flex-col">
                        {isLoading ? (
                            <Skeleton variant="text" width={100} />
                        ) : (
                            <p className="font-bold">Payment status</p>
                        )}
                        <p>
                            {isLoading ? (
                                <Skeleton variant="text" width={80} />
                            ) : (
                                data?.paymentStatus
                            )}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col space-y-4 md:flex-row md:space-x-8 md:space-y-0">
                    <div className="flex flex-col">
                        {isLoading ? (
                            <Skeleton variant="text" width={150} />
                        ) : (
                            <p className="font-bold">Expected delivery</p>
                        )}
                        <p>
                            {isLoading ? (
                                <Skeleton variant="text" width={120} />
                            ) : (
                                moment(data?.createdAt)
                                    .add(2, "days")
                                    .format("dd, DD.MM.YYYY")
                            )}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {(isLoading ? placeholderArray(2) : data!.items).map(
                            (item, index) => (
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
                                    ) : index === 1 &&
                                      data!.items.length > 2 ? (
                                        <div className="relative max-w-[150px] sm:max-w-[180px] md:max-w-[220px]">
                                            <img
                                                src={
                                                    (item.product as Product)
                                                        .imageUrl[0]
                                                }
                                                loading="lazy"
                                                className="max-w-full object-cover object-top md:object-center opacity-50"
                                                alt={
                                                    (item.product as Product)
                                                        .title
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
                                                    (item.product as Product)
                                                        .title
                                                }
                                            />
                                        </Link>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
