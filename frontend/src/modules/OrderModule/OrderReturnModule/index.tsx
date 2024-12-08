import DefaultLayout from "@/layouts/DefaultLayout";
import StepperForm from "@/components/StepperForm";
import ReasonStep from "./components/ReasonStep";
import ReturnMethodStep from "./components/ReturnMethodStep";
import SummaryStep from "./components/SummaryStep";
import type { Order } from "@/types/Order";
import type { StepProps } from "./types/Step";

interface OrderReturnModule {
    data: Order;
}

const steps = [
    {
        label: "Reason for return",
        element: (props: StepProps) => <ReasonStep {...props} />,
    },
    {
        label: "Return Method",
        element: (props: StepProps) => <ReturnMethodStep {...props} />,
    },
    {
        label: "Summary",
        element: (props: StepProps) => <SummaryStep {...props} />,
    },
];

const OrderReturnModule = () => {
    return (
        <DefaultLayout>
            <StepperForm content={steps} />
        </DefaultLayout>
    );
};

export default OrderReturnModule;
