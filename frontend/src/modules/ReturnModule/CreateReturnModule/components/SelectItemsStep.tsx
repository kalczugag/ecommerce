import ProductSelectionForm from "@/forms/ProductSelectionForm";
import type { Order } from "@/types/Order";
import type { StepProps } from "@/types/Step";

interface SelectItemsStepProps extends StepProps {
    data?: Order;
}

const SelectItemsStep = ({ data }: SelectItemsStepProps) => {
    return <ProductSelectionForm items={data?.items || []} />;
};

export default SelectItemsStep;
