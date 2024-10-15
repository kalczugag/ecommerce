import { useOrder } from "@/contexts/OrderContext";
import DefaultLayout from "@/layouts/DefaultLayout";
import TabsWithStepper from "./components/TabsWithStepper";
import DeliveryAddress from "./components/DeliveryAddress";
import OrderSummary from "./components/OrderSummary";
import Payment from "./components/Payment";
import Loading from "@/components/Loading";
import type { Step } from "@/types/Order";

const CheckoutModule = () => {
    const { isLoading } = useOrder();

    const steps: Step[] = [
        {
            label: "Delivery Address",
            content: <DeliveryAddress />,
        },
        {
            label: "Order Summary",
            content: <OrderSummary />,
        },
        {
            label: "Payment",
            content: <Payment />,
        },
    ];

    return (
        <Loading isLoading={isLoading}>
            <DefaultLayout>
                <TabsWithStepper steps={steps} />
            </DefaultLayout>
        </Loading>
    );
};

export default CheckoutModule;
