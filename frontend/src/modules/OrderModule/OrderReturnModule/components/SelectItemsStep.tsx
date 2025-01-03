import type { Order } from "@/types/Order";
import type { StepProps } from "@/types/Step";

interface SelectItemsStepProps extends StepProps {
    data?: Order;
}

const SelectItemsStep = ({ data }: SelectItemsStepProps) => {
    return <div></div>;
};

export default SelectItemsStep;
