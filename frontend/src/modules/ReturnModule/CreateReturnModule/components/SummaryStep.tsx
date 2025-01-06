import type { StepProps } from "../../../../types/Step";
import type { Order } from "@/types/Order";

interface SummaryStepProps extends StepProps {
    data?: Order;
}

const SummaryStep = ({ data }: SummaryStepProps) => {
    return <div></div>;
};

export default SummaryStep;
