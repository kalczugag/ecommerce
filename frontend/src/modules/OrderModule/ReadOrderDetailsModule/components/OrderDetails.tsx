import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Divider, Skeleton } from "@mui/material";
import SummaryCard from "../../ReadOrderListModule/components/SummaryCard";
import ProductCard from "./ProductCard";
import OrderTotal from "./OrderTotal";
import OrderAddress from "./OrderAddress";
import type { Order } from "@/types/Order";
import type { Product } from "@/types/Product";

interface OrderDetailsProps {
    data?: Order;
    isLoading: boolean;
}

const OrderDetails = ({ data, isLoading }: OrderDetailsProps) => {
    const navigate = useNavigate();

    const priceData = {
        total: data?.total.toFixed(2) || "",
        subTotal: data?.subTotal.toFixed(2) || "",
        discount: data?.discount.toFixed(2) || "",
        delivery: data?.deliveryCost.toFixed(2) || "",
    };

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2 justify-between md:space-y-0 md:items-center md:flex-row">
                <h1 className="font-bold text-3xl">
                    {isLoading ? (
                        <Skeleton variant="text" width={150} />
                    ) : (
                        `Order number: ${data?._id}`
                    )}
                </h1>
                <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => navigate(`/return/${data?._id}`)}
                >
                    Return
                </Button>
            </div>
            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    <SummaryCard
                        label="Order date"
                        value={moment(data?.createdAt).format("dd, DD.MM.YYYY")}
                        isLoading={isLoading}
                    />
                    <SummaryCard
                        label="Payment Method"
                        value={data?.paymentMethod || ""}
                        isLoading={isLoading}
                    />
                </div>

                <Divider />

                <div className="flex flex-col space-y-">
                    <div className="flex flex-col font-semibold space-y-2">
                        <h2 className="text-2xl">
                            {isLoading ? (
                                <Skeleton variant="text" width={150} />
                            ) : (
                                `Expected delivery: ${moment(data?.createdAt)
                                    .add(2, "days")
                                    .format("dd, DD.MM.YYYY")}`
                            )}
                        </h2>
                        <p>
                            {isLoading ? (
                                <Skeleton variant="text" width={120} />
                            ) : (
                                "Standard delivery within 1-3 business days"
                            )}
                        </p>
                    </div>
                </div>
                {data?.items.map((item) => (
                    <ProductCard
                        key={(item.product as Product)._id}
                        data={item}
                        isLoading={isLoading}
                    />
                ))}

                <Divider />

                <OrderTotal {...priceData} />

                <Divider />

                <OrderAddress
                    name={data?._user?.firstName + " " + data?._user?.lastName}
                    address={data?._user?.address}
                />
            </div>
        </div>
    );
};

export default OrderDetails;
