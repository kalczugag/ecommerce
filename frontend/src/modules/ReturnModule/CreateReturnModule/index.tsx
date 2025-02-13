import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery, useAddReturnMutation } from "@/store";
import DefaultLayout from "@/layouts/DefaultLayout";
import StepperForm from "@/components/StepperForm";
import ReasonStep from "./components/ReasonStep";
import ReturnMethodStep from "./components/ReturnMethodStep";
import SummaryStep from "./components/SummaryStep";
import SelectItemsStep from "./components/SelectItemsStep";
import type { StepProps } from "@/types/Step";
import type { CreateReturnOrder } from "@/types/Returns";

interface ReturnFormValues {
    reason?: string;
    otherReason?: string;
    deliveryMethod: string;
    selectedProducts: string[];
}

const CreateReturnModule = () => {
    const { id } = useParams();
    const { data } = useGetOrderByIdQuery(id || "");
    const [addReturn] = useAddReturnMutation();

    const steps = [
        {
            label: "Reason for return",
            element: (props: StepProps) => <ReasonStep {...props} />,
        },
        {
            label: "Select items",
            element: (props: StepProps) => (
                <SelectItemsStep {...props} data={data?.result} />
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

    const handleSubmit = async (values: ReturnFormValues) => {
        const { reason, otherReason, deliveryMethod, selectedProducts } =
            values;

        const output: CreateReturnOrder = {
            _order: id!,
            returnedItems: selectedProducts,
            returnReason: reason || otherReason || "other",
        };

        await addReturn(output);
    };

    return (
        <DefaultLayout marginY={false}>
            <StepperForm content={steps} onSubmit={handleSubmit} />
        </DefaultLayout>
    );
};

export default CreateReturnModule;
