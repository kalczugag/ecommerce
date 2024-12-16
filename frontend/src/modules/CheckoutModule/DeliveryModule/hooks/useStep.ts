import { useOrder } from "@/contexts/OrderContext";
import { useNavigate, useParams } from "react-router-dom";

const useStep = (): [
    step: string | undefined,
    nextStep: () => void,
    prevStep: () => void
] => {
    const navigate = useNavigate();
    const { order, steps } = useOrder();
    const { "*": step } = useParams<{
        "*": string;
    }>();

    const activeStep = steps.indexOf(step!);

    const nextStep = () => {
        navigate(`/checkout/${order?._id}/${steps[activeStep + 1]}`);
    };

    const prevStep = () => {
        if (activeStep > 0) {
            navigate(`/checkout/${order?._id}/${steps[activeStep - 1]}`);
        }
    };

    return [step, nextStep, prevStep];
};

export default useStep;
