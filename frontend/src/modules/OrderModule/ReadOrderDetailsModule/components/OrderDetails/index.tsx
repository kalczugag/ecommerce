import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment-business-days";
import { processPayments, processShipments } from "@/utils/processFunctions";
import { deliveryMethods } from "@/constants/deliveryMethods";
import { Button, Divider, Skeleton } from "@mui/material";
import SummaryCard from "../../../ReadOrderListModule/components/SummaryCard";
import ProductCard from "../ProductCard";
import OrderTotal from "../OrderTotal";
import OrderAddress from "../OrderAddress";
import type { Item, Order } from "@/types/Order";
import type { DeliveryMethod } from "@/types/DeliveryMethod";

interface OrderDetailsProps {
    data?: Order;
    isLoading: boolean;
}

const OrderDetails = ({ data, isLoading }: OrderDetailsProps) => {
    const navigate = useNavigate();
    const { payments } = processPayments(data?.payments || []);
    const { shipmentTotal } = processShipments(data?.shipments || []);

    const deliveryMethod = data?.shipments[0]
        ?._deliveryMethod as DeliveryMethod;

    const methodName = deliveryMethod?.providers?.[0]?.name
        ? `${deliveryMethod.providers[0].name} - ${
              deliveryMethods[deliveryMethod.type]
          }`
        : "Unknown Method";

    const expectedDeliveryLabel = deliveryMethod?.providers?.[0]
        ? `${methodName} delivery within ${deliveryMethod.providers[0].estimatedDeliveryTimeMin} - ${deliveryMethod.providers[0].estimatedDeliveryTimeMax} business days`
        : "Estimated delivery time not available";

    const expectedDeliveryDate = deliveryMethod?.providers?.[0]
        ? moment(data?.createdAt)
              .businessAdd(
                  deliveryMethod.providers[0].estimatedDeliveryTimeMin || 1,
                  "days"
              )
              .format("dd, DD.MM.YYYY")
        : "N/A";

    const summaryCardsData = [
        {
            label: "Order date",
            value: moment(data?.createdAt).format("dd, DD.MM.YYYY"),
        },
        {
            label: "Payment Method",
            value: payments[0]?.paymentMethod,
        },
        {
            label: "Status",
            value: data?.status,
        },
    ];

    const priceData = {
        total: data?.total.toFixed(2) || "",
        subTotal: data?.subTotal.toFixed(2) || "",
        discount: data?.discount?.toFixed(2) || "",
        delivery: shipmentTotal.toFixed(2) || "",
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
                {data?.status !== "canceled" && data?.status !== "returned" && (
                    <Button
                        variant="outlined"
                        onClick={() => navigate(`return`)}
                        disabled={isLoading}
                        sx={{
                            "@media print": {
                                display: "none",
                            },
                        }}
                    >
                        Return
                    </Button>
                )}
            </div>
            <div className="space-y-10">
                <div className="flex flex-row space-x-8 print:hidden">
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

                {data?.status !== "canceled" ? (
                    <div className="flex flex-col">
                        <div className="flex flex-col font-semibold space-y-2">
                            <h2 className="text-2xl">
                                Expected delivery: {expectedDeliveryDate}
                            </h2>
                            <p>{expectedDeliveryLabel}</p>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-2xl font-semibold">Products</h2>
                )}
                {data?.items.map((item, index) => (
                    <ProductCard
                        key={index}
                        data={item as Item}
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

                <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row md:justify-between lg:w-1/2">
                    <OrderAddress
                        label="Shipping Address"
                        name={
                            data?._user?.firstName + " " + data?._user?.lastName
                        }
                        address={data?.shippingAddress}
                        isLoading={isLoading}
                    />
                    <OrderAddress
                        label="Billing Address"
                        name={
                            data?._user?.firstName + " " + data?._user?.lastName
                        }
                        address={data?.billingAddress}
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
