import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Divider, Skeleton } from "@mui/material";
import type { Order } from "@/types/Order";
import SummaryCard from "../../../ReadOrderListModule/components/SummaryCard";
import ProductCard from "../ProductCard";
import OrderTotal from "../OrderTotal";
import OrderAddress from "../OrderAddress";
import ProductCardSkeleton from "../ProductCard/ProductCardSkeleton";

interface OrderDetailsProps {
    data?: Order;
    isLoading: boolean;
}

const OrderDetails = ({ data, isLoading }: OrderDetailsProps) => {
    const navigate = useNavigate();

    const summaryCardsData = [
        {
            label: "Order date",
            value: moment(data?.createdAt).format("dd, DD.MM.YYYY"),
        },
        {
            label: "Payment Method",
            value: data?.paymentMethod,
        },
        {
            label: "Status",
            value: data?.status,
        },
    ];

    const priceData = {
        total: data?.total.toFixed(2) || "",
        subTotal: data?.subTotal.toFixed(2) || "",
        discount: data?.discount.toFixed(2) || "",
        delivery: data?.deliveryCost.toFixed(2) || "",
    };

    return (
        <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-2 justify-between md:space-y-0 md:items-center md:flex-row">
                <h1 className="font-bold text-3xl break-words">
                    Order number:{" "}
                    {isLoading ? (
                        <Skeleton
                            variant="text"
                            width={250}
                            sx={{ display: "inline-block" }}
                        />
                    ) : (
                        data?._id
                    )}
                </h1>
                {data?.status !== "canceled" && (
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`/return/${data?._id}`)}
                        disabled={isLoading}
                    >
                        Return
                    </Button>
                )}
            </div>
            <div className="space-y-10">
                <div className="flex flex-row space-x-8">
                    {summaryCardsData.map(({ label, value }) => (
                        <SummaryCard
                            key={label}
                            label={label}
                            value={value || ""}
                            isLoading={isLoading}
                        />
                    ))}
                </div>

                <Divider />

                {data?.items.map((item, index) => (
                    <ProductCard
                        key={index}
                        data={item}
                        status={data?.status}
                        timestamp={data?.createdAt}
                        isLoading={isLoading}
                    />
                ))}

                <Divider />

                <OrderTotal
                    {...priceData}
                    status={data?.status}
                    isLoading={isLoading}
                />

                <Divider />

                <OrderAddress
                    name={data?._user?.firstName + " " + data?._user?.lastName}
                    address={data?._user?.address}
                    isLoading={isLoading}
                />
            </div>
        </div>
    );
};

export default OrderDetails;
