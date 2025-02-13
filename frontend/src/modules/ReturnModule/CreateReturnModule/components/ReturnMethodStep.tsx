import { useGetDeliveryMethodsQuery } from "@/store";
import DeliveryMethodForm from "@/forms/DeliveryMethodForm";
import type { StepProps } from "../../../../types/Step";

const ReturnMethodStep = ({ formValues }: StepProps) => {
    const { data, isLoading } = useGetDeliveryMethodsQuery();

    return (
        <DeliveryMethodForm
            content={data?.result || []}
            isLoading={isLoading}
        />
    );
};

export default ReturnMethodStep;
