import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "@/store";
import DefaultLayout from "@/layouts/DefaultLayout";
import StepperForm from "@/components/StepperForm";
import ReasonStep from "./components/ReasonStep";
import ReturnMethodStep from "./components/ReturnMethodStep";
import SummaryStep from "./components/SummaryStep";
import SelectItemsStep from "./components/SelectItemsStep";
import type { StepProps } from "@/types/Step";

const OrderReturnModule = () => {
    const { id } = useParams();

    const { data, isLoading, isError } = useGetOrderByIdQuery(id || "");

    const steps = [
        {
            label: "Reason for return",
            element: (props: StepProps) => <ReasonStep {...props} />,
        },
        {
            label: "Select items",
            element: (props: StepProps) => (
                <SelectItemsStep {...props} data={data} />
            ),
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

    return (
        <DefaultLayout marginY={false}>
            <StepperForm content={steps} />
        </DefaultLayout>
    );
};

export default OrderReturnModule;
